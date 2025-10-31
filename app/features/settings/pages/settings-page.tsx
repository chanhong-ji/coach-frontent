import CategoryCard from "../components/category-card";
import BudgetCard from "../components/budget-card";
import AccountCard from "../components/account-card";
import type { Route } from "./+types/settings-page";
import { createClient } from "~/client";
import { findCategories } from "~/features/expenses/lib/loader-helpers";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
  const {
    findCategories: { categories },
  } = await findCategories(client);
  return { categories };
};

export default function SettingsPage({ loaderData }: Route.ComponentProps) {
  const { categories } = loaderData;
  return (
    <div className="px-30 pt-10 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <CategoryCard className="w-full" categories={categories ?? []} />
      <BudgetCard className="w-full" />
      <AccountCard className="w-full" />
    </div>
  );
}
