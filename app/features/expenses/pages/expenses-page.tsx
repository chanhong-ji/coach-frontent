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
  fetchMonthlyTotal,
  fetchCategories,
} from "../lib/loader-helpers";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { year, month } = parseParamsOrThrow(params);

  if (isFutureMonth(year, month)) {
    throw new Error("Future month");
  }

  const { client } = createClient(request);

  const [monthlyTotalResult, expensesResult, categoriesResult] = await Promise.all([
    fetchMonthlyTotal(client, year, month),
    fetchMonthlyExpenses(client, year, month),
    fetchCategories(client),
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

  if (!monthlyOk) {
    throw new Error(monthlyError ?? "Failed to find monthly expense total");
  }
  if (!expensesOk) {
    throw new Error(expensesError ?? "Failed to find expenses");
  }

  const { totalExpense, totalCount } = months?.[0] ?? { totalExpense: 0, totalCount: 0 };

  return { year, month, totalExpense, totalCount, expenses, categories };
};

export default function ExpensesPage({ loaderData }: Route.ComponentProps) {
  const { year, month, totalExpense, totalCount, expenses, categories } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center bg-background p-5">
      <DateCard year={year} month={month} />
      <MonthlyOverview year={year} month={month} totalExpense={totalExpense} totalCount={totalCount} />
      <div className="flex flex-col mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="self-end hover:cursor-pointer">
              Add Expense
            </Button>
          </DialogTrigger>
          <AddExpenseDialog />
        </Dialog>
        <ExpenseList expenses={expenses ?? []} categories={categories ?? []} />
      </div>
      <PaginationBar totalPages={10} />
    </div>
  );
}
