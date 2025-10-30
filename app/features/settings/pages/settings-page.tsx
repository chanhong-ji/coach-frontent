import { Dialog } from "~/common/components/ui/dialog";
import CategoryCard from "../components/category-card";

export default function SettingsPage() {
  return (
    <div className="px-30 pt-10 flex flex-col items-center justify-center space-y-10">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <CategoryCard className="w-full" />
    </div>
  );
}
