import CategoryCard from "../components/category-card";
import BudgetCard from "../components/budget-card";
import AccountCard from "../components/account-card";
import type { Route } from "./+types/settings-page";
import { createClient } from "~/client";
import { findBudgets, findCategories } from "~/features/expenses/lib/loader-helpers";
import { DateTime } from "luxon";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const today = DateTime.now();
  const thisYear = today.year;
  const thisMonth = today.month;

  const { client } = createClient(request);
  const {
    findCategories: { categories },
  } = await findCategories(client);

  const {
    findBudgets: { budgets },
  } = await findBudgets(client, {
    year: thisYear,
    months: [thisMonth],
  });
  return { categories, budgets, year: thisYear, month: thisMonth };
};

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
  const { categories, budgets, year, month } = loaderData;
  return (
    <div className="px-30 pt-10 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <CategoryCard className="w-full" categories={categories ?? []} />
      <BudgetCard className="w-full" budgets={budgets ?? []} categories={categories ?? []} year={year} month={month} />
      <AccountCard className="w-full" />
    </div>
  );
}
