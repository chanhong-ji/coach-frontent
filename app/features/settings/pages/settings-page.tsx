import CategoryCard from "../components/category-card";
import BudgetCard from "../components/budget-card";
import AccountCard from "../components/account-card";
import type { Route } from "./+types/settings-page";
import { createClient } from "~/client";
import { findAccounts, findBudgets, findCategories } from "~/features/expenses/lib/loader-helpers";
import { DateTime } from "luxon";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const today = DateTime.now();
  const thisYear = today.year;
  const thisMonth = today.month;

  const { client } = createClient(request);
  const [
    {
      findCategories: { categories },
    },
    {
      findBudgets: { budgets },
    },
    {
      findAccounts: { accounts },
    },
  ] = await Promise.all([
    findCategories(client),
    findBudgets(client, { year: thisYear, month: thisMonth }),
    findAccounts(client),
  ]);

  return { categories, budgets, year: thisYear, month: thisMonth, accounts };
};

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
  const { categories, budgets, year, month, accounts } = loaderData;
  return (
    <div className="pt-10 flex flex-col items-center justify-center space-y-10 w-1/2 min-w-lg mx-auto">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <CategoryCard className="w-full" categories={categories ?? []} />
      <BudgetCard className="w-full" budgets={budgets ?? []} categories={categories ?? []} year={year} month={month} />
      <AccountCard className="w-full" accounts={accounts ?? []} />
    </div>
  );
}
