import type { Route } from "./+types/expenses-page";
import { z } from "zod";
import { DateTime } from "luxon";
import { DateCard } from "../components/date-card";
import { MonthlyOverview } from "../components/monthly-overview";
import { PaginationBar } from "~/common/components/pagination-bar";
import { ExpenseList } from "../components/expense-list";
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { AddExpenseDialog } from "../components/add-expense-dialog";

const paramSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedParams } = paramSchema.safeParse(params);
  if (!success) {
    throw new Error("Invalid parameters");
  }
  const { year, month } = parsedParams;
  const thisYear = DateTime.now().year;
  const thisMonth = DateTime.now().month;
  const isFuture = thisYear > year || (thisYear === year && month > thisMonth);
  if (isFuture) {
    throw new Error("Future month");
  }
  return { year, month };
};

export default function ExpensesPage({ loaderData }: Route.ComponentProps) {
  const { year, month } = loaderData;

  return (
    <div className="flex flex-col items-center justify-center">
      <DateCard year={year} month={month} />
      <MonthlyOverview year={year} month={month} />
      <div className="flex flex-col mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="self-end hover:border-primary">
              Add Expense
            </Button>
          </DialogTrigger>
          <AddExpenseDialog />
        </Dialog>
        <ExpenseList />
      </div>
      <PaginationBar totalPages={10} />
    </div>
  );
}
