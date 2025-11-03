import type { Route } from "./+types/dashboard-summary-page";
import { createClient } from "~/client";
import { findMonthlyExpenseTotal, findSummary } from "~/features/expenses/lib/loader-helpers";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { currency } from "~/features/settings/utils/util";
import { Separator } from "~/common/components/ui/separator";
import { Progress } from "~/common/components/ui/progress";
import { Sparkles } from "lucide-react";
import { Info } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TabsContent } from "~/common/components/ui/tabs";

const aiInsight = `Your financial overview for November shows a positive trend with a 5.3% decrease in overall spending. Groceries and Dining Out remain your top expenses. Consider reviewing your Dining Out budget for potential savings. Your daily spending patterns indicate higher expenses on weekends. The system detected an unusual large transaction of $350 on November 20th in 'Electronics', which is above your typical spending. Recurring subscriptions include Netflix ($15.99) and Spotify ($10.99), both due next week.`;

const monthLabels = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const meta: Route.MetaFunction = () => [{ title: "Dashboard - Summary" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
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

  return { summary, monthlyExpenseTotal: monthlyExpenseTotal ?? [] };
};

export async function action({}: Route.ActionArgs) {
  return {};
}

export default function DashboardSummaryPage({ loaderData }: Route.ComponentProps) {
  const { summary, monthlyExpenseTotal } = loaderData;
  const spendingMonthly = monthlyExpenseTotal.map((m) => ({
    month: monthLabels[m.month as keyof typeof monthLabels],
    amount: m.totalExpense,
  }));

  const today = DateTime.now();

  return (
    <TabsContent value="summary" className="space-y-6 mt-4">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Monthly Summary */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Monthly Summary</CardTitle>
            </div>
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
              {monthLabels[today.month]} {today.year}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-4xl font-semibold">{currency(summary?.thisMonthExpense ?? 0)}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                {summary?.lastMonthExpense && (
                  <span className="text-red-600">
                    {summary.thisMonthExpense > summary.lastMonthExpense ? "↑" : "↓"}
                    {(summary.lastMonthExpense
                      ? Math.abs(
                          ((summary.thisMonthExpense - summary.lastMonthExpense) / summary.lastMonthExpense) * 100,
                        )
                      : 0
                    ).toFixed(2)}
                    %{summary.thisMonthExpense > summary.lastMonthExpense ? " increase" : " decrease"} from last month
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="text-sm font-medium">Top Categories</div>
              <div className="space-y-4">
                {summary?.topCategory.map((c) => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{c.name}</span>
                        <Badge variant="secondary" className="rounded-full px-2 text-[10px]">
                          {c.totalExpense ? ((c.totalExpense / summary.thisMonthExpense) * 100).toFixed(2) : "0.00"}%
                        </Badge>
                      </div>
                      <span className="tabular-nums">{currency(c.totalExpense ?? 0)}</span>
                    </div>
                    <Progress
                      value={c.totalExpense ? (c.totalExpense / summary.thisMonthExpense) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Financial Insights */}
        <Card className="bg-primary/10 border-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <CardTitle>AI Financial Insights</CardTitle>
            </div>
            <CardDescription className="sr-only">Automated monthly coaching summary</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-foreground/90">{aiInsight}</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Spending Patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <CardTitle>Monthly Spending Patterns</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingMonthly} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => currency(Number(v))} fontSize={10} />
              <Tooltip
                formatter={(v: any) => currency(Number(v))}
                labelClassName="text-xs"
                contentStyle={{ borderRadius: 8 }}
              />
              <Line type="monotone" dataKey="amount" strokeWidth={2} dot={false} stroke="var(--primary)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
