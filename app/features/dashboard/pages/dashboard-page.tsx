import type { Route } from "./+types/dashboard-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/common/components/ui/tabs";
import { SummaryTab } from "../tabs/summary-tab";
import { createClient } from "~/client";
import { findMonthlyExpenseTotal, findSummary, getLoggedInUser } from "~/features/expenses/lib/loader-helpers";
import { DateTime } from "luxon";
import { redirect } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
  const user = await getLoggedInUser(client);
  if (!user) {
    return redirect("/login");
  }

  const today = DateTime.now();
  const months = Array.from({ length: today.month }, (_, i) => today.month - i);
  const [
    {
      findSummary: { summary },
    },
    {
      findMonthlyExpenseTotal: { months: monthlyExpenseTotal },
    },
  ] = await Promise.all([
    findSummary(client, {
      thisYear: today.year,
      thisMonth: today.month,
    }),
    findMonthlyExpenseTotal(client, today.year, months),
  ]);

  return { summary, monthlyExpenseTotal };
};

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const { summary, monthlyExpenseTotal } = loaderData;
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 space-y-6">
      <Tabs defaultValue="summary" className="">
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

        <SummaryTab
          summary={summary ?? { lastMonthExpense: 0, thisMonthExpense: 0, topCategory: [] }}
          monthlyExpenseTotal={monthlyExpenseTotal ?? []}
        />
        <TabsContent value="budget">
          <Card>
            <CardHeader>
              <CardTitle>Budget & Alerts</CardTitle>
              <CardDescription>Coming soon. Wire up your GraphQL queries here.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Example: category budgets, forecast warnings, upcoming alerts.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coach">
          <Card>
            <CardHeader>
              <CardTitle>AI Coach & Recurring</CardTitle>
              <CardDescription>Coming soon.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Example: chatbot, recurring subscription detection.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
