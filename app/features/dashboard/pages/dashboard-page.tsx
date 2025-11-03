import type { Route } from "./+types/dashboard-page";
import { Tabs, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import { createClient } from "~/client";
import { getLoggedInUser } from "~/features/expenses/lib/loader-helpers";
import { Outlet, redirect, useLocation, useNavigate } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
  const user = await getLoggedInUser(client);
  if (!user) {
    return redirect("/login");
  }
  return {};
};

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const currentTab = pathname.includes("/dashboard/budget")
    ? "budget"
    : pathname.includes("/dashboard/coach")
      ? "coach"
      : "summary";
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 space-y-6">
      <Tabs
        value={currentTab}
        onValueChange={(next) => {
          if (next === "summary") {
            navigate("/dashboard/summary");
            return;
          }
          navigate(`/dashboard/${next}`);
        }}
        className=""
      >
        <div className="">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger
              value="summary"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              Summary & Insights
            </TabsTrigger>
            <TabsTrigger
              value="budget"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              Budget & Alerts
            </TabsTrigger>
            <TabsTrigger
              value="coach"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer"
            >
              AI Coach & Recurring
            </TabsTrigger>
          </TabsList>
        </div>

        <Outlet />
      </Tabs>
    </div>
  );
}
