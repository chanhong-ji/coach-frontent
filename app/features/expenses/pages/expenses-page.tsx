import type { Route } from "./+types/expenses-page";
import { DateCard } from "../components/date-card";
import { MonthlyOverview } from "../components/monthly-overview";
import { PaginationBar } from "~/common/components/pagination-bar";
import { ExpenseList } from "../components/expense-list";
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { AddExpenseDialog } from "../components/add-expense-dialog";
import { createClient } from "~/client";
import {
  parseParamsOrThrow,
  isFutureMonth,
  fetchMonthlyExpenses,
  findMonthlyExpenseTotal,
  findCategories,
  findAccounts,
  parseSearchParamsOrThrow,
  updateExpense,
  getLoggedInUser,
} from "../lib/loader-helpers";
import { useEffect, useState } from "react";
import { z } from "zod";
import { redirect } from "react-router";

const editExpenseSchema = z.object({
  id: z.coerce.number(),
  name: z.coerce.string().min(1),
  amount: z.coerce.number().min(0),
  date: z.coerce.date(),
  accountId: z.coerce.string(),
  categoryId: z.coerce.string(),
  memo: z.coerce.string().optional(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
  const user = await getLoggedInUser(client);
  if (!user) {
    return redirect("/login");
  }

  const { year, month } = parseParamsOrThrow(params);
  const { page } = parseSearchParamsOrThrow(request.url);

  if (isFutureMonth(year, month)) {
    throw new Error("Future month");
  }

  const [monthlyTotalResult, expensesResult, categoriesResult, accountsResult] = await Promise.all([
    findMonthlyExpenseTotal(client, year, [month]),
    fetchMonthlyExpenses(client, year, month, page),
    findCategories(client),
    findAccounts(client),
  ]);

  const {
    findMonthlyExpenseTotal: { ok: monthlyOk, error: monthlyError, months },
  } = monthlyTotalResult;
  const {
    findExpenseMonthly: { ok: expensesOk, error: expensesError, expenses },
  } = expensesResult;
  const {
    findCategories: { categories },
  } = categoriesResult;

  const {
    findAccounts: { accounts },
  } = accountsResult;

  if (!monthlyOk) {
    throw new Error(monthlyError ?? "Failed to find monthly expense total");
  }
  if (!expensesOk) {
    throw new Error(expensesError ?? "Failed to find expenses");
  }

  const { totalExpense, totalCount } = months?.[0] ?? { totalExpense: 0, totalCount: 0 };

  return { year, month, totalExpense, totalCount, expenses, categories, accounts };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = editExpenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    throw new Error("Invalid data");
  }

  const { id, name, amount, date, accountId, categoryId, memo } = parsedData.data;
  const response = await updateExpense(client, {
    id,
    name,
    amount,
    postedAt: date.toISOString(),
    accountId: Number(accountId),
    categoryId: Number(categoryId),
    memo,
  });

  if (!response.updateExpense.ok) {
    console.log(response.updateExpense.error, ":response.updateExpense.error from action");
    throw new Error(response.updateExpense.error ?? "Unknown error");
  }
  return { ok: true };
};

export default function ExpensesPage({ loaderData, actionData }: Route.ComponentProps) {
  const { year, month, totalExpense, totalCount, expenses, categories, accounts } = loaderData;
  const totalPages = Math.ceil(totalCount / 10);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (actionData?.ok) {
      setEditOpen(false);
    }
  }, [actionData, setEditOpen]);

  return (
    <div className="flex flex-col items-center justify-center bg-background p-5">
      <DateCard year={year} month={month} />
      <MonthlyOverview year={year} month={month} totalExpense={totalExpense} totalCount={totalCount} />
      <div className="flex flex-col mt-10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="link" className="self-end hover:cursor-pointer">
              Add Expense
            </Button>
          </DialogTrigger>
          <AddExpenseDialog categories={categories ?? []} accounts={accounts ?? []} setOpen={setOpen} />
        </Dialog>
        <ExpenseList expenses={expenses ?? []} categories={categories ?? []} accounts={accounts ?? []} />
      </div>
      <PaginationBar totalPages={totalPages} />
    </div>
  );
}
