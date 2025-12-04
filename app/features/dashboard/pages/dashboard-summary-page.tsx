import type { Route } from "./+types/dashboard-summary-page";
import { createClient } from "~/client";
import { findAgentAdvices, findMonthlyExpenseTotal, findSummary } from "~/features/expenses/lib/loader-helpers";
import { DateTime } from "luxon";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { currency } from "~/features/settings/utils/util";
import { Separator } from "~/common/components/ui/separator";
import { Progress } from "~/common/components/ui/progress";
import { Info } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TabsContent } from "~/common/components/ui/tabs";
import { AdviceType } from "~/graphql/__generated__/graphql";
import { AiRequestButton } from "../components/ai-request-button";
import { requestAdvice } from "~/features/settings/utils/action-helpers";
import { useActionData } from "react-router";
import { useEffect } from "react";

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
    {
      findAdvices: { advices },
    },
  ] = await Promise.all([
    findSummary(client, {
      thisYear: today.year,
      thisMonth: today.month,
    }),
    findMonthlyExpenseTotal(client, today.year, months),
    findAgentAdvices(client),
  ]);

  return { summary, monthlyExpenseTotal: monthlyExpenseTotal ?? [], advices: advices ?? [] };
};

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const {
    createAgentAdvice: { ok, error },
  } = await requestAdvice(client);
  if (!ok) {
    return { ok: false, error: error };
  }
  return { ok: true };
};

export default function DashboardSummaryPage({ loaderData }: Route.ComponentProps) {
  const { summary, monthlyExpenseTotal, advices } = loaderData;
  const actionData = useActionData<typeof action>();
  const periodEnd = advices?.[0]?.periodEnd;
  const spendingMonthly = monthlyExpenseTotal.map((m) => ({
    month: monthLabels[m.month as keyof typeof monthLabels],
    amount: m.totalExpense,
  }));

  const today = DateTime.now();

  useEffect(() => {
    if (actionData && !actionData.ok && actionData.error) {
      if (actionData.error === "ADVICE_REQUEST_IN_PROGRESS") {
        alert("AI 조언 요청이 진행 중입니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(actionData.error);
      }
    }
  }, [actionData]);

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
                {summary?.lastMonthExpense ? (
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
                ) : null}
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
                          {c.totalExpense && c.thisMonthBudget
                            ? ((c.totalExpense / c.thisMonthBudget) * 100).toFixed(2)
                            : "0.00"}
                          %
                        </Badge>
                      </div>
                      <span className="tabular-nums">{currency(c.totalExpense ?? 0)}</span>
                    </div>
                    <Progress
                      value={c.totalExpense && c.thisMonthBudget ? (c.totalExpense / c.thisMonthBudget) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative">
          <AiRequestButton lastAdviceRequestTime={periodEnd} className="cursor-pointer" />
          <CardContent className="h-full">
            <section className="space-y-2 h-1/2 pt-5">
              <CardTitle>AI 월간 소비 리포트</CardTitle>
              <p className="text-sm leading-6 text-foreground/90">
                {advices.find((a) => a.type === AdviceType.SummaryReport)?.adviceText ?? ""}
              </p>
            </section>

            <Separator />

            <section className="space-y-2 h-1/2 pt-5 pb-10">
              <CardTitle>AI 소비 습관 인사이트</CardTitle>
              <p className="text-sm leading-6 text-foreground/90">
                {advices.find((a) => a.type === AdviceType.HabitInsight)?.adviceText ?? ""}
              </p>
            </section>
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
