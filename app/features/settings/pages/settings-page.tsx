import CategoryCard from "../components/category-card";
import BudgetCard from "../components/budget-card";
import AccountCard from "../components/account-card";

export default function SettingsPage() {
  return (
    <div className="px-30 pt-10 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <CategoryCard className="w-full" />
      <BudgetCard className="w-full" />
      <AccountCard className="w-full" />
    </div>
  );
}
