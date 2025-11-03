import type { Route } from "./+types/dashboard-budget-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { TabsContent } from "~/common/components/ui/tabs";
import { Button } from "~/common/components/ui/button";
import { currency } from "~/features/settings/utils/util";
import { AlertTriangle, CreditCard, CalendarDays, ScanSearch } from "lucide-react";
import { DateTime } from "luxon";
import { createClient } from "~/client";
import { findBudgets } from "~/features/expenses/lib/loader-helpers";
import type { BudgetDto } from "~/graphql/__generated__/graphql";
import { Badge } from "~/common/components/ui/badge";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard - Budget" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const today = DateTime.now();
  const thisYear = today.year;
  const thisMonth = today.month;
  const { client } = createClient(request);
  const budgets = await findBudgets(client, { year: thisYear, month: thisMonth });
  return { budgets: budgets.findBudgets.budgets ?? [] };
};

interface BudgetCategory {
  name: string;
  spent: number;
  target: number;
}

function percent(value: number, total: number) {
  if (total <= 0) return 0;
  const p = (value / total) * 100;
  return Math.max(0, Math.min(100, p));
}

function BudgetBar({ budget }: { budget: BudgetDto }) {
  const valuePct = percent(budget.category?.totalExpense ?? 0, budget.totalAmount);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground/90">{budget.category?.name}</span>
        <span className="tabular-nums text-foreground/90">
          {currency(budget.category?.totalExpense ?? 0)}{" "}
          <span className="text-muted-foreground">/ {currency(budget.totalAmount)}</span>
        </span>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-muted">
        <div className="absolute left-0 top-0 h-full rounded-full bg-primary/60" style={{ width: `${valuePct}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-primary/70 bg-background shadow"
          style={{ left: `calc(${valuePct}% - 6px)` }}
          aria-hidden
        />
      </div>
    </div>
  );
}

const aiAdvice = `Your spending on Dining Out has significantly exceeded your monthly budget by 100%. This trend, if continued, could negatively impact your financial goals.`;

export default function DashboardBudgetPage({ loaderData }: Route.ComponentProps) {
  const { budgets } = loaderData;
  const overspend = budgets.find((b) => b.category?.name === "게임");

  return (
    <TabsContent value="budget" className="space-y-6 mt-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>월간 예산 분석</CardTitle>
            <CardDescription>각 카테고리별 예산과 지출 현황을 확인할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {budgets.map((budget) => (
              <BudgetBar key={budget.id} budget={budget} />
            ))}
          </CardContent>
        </Card>

        <Card className="bg-destructive/10 border-destructive/20">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-destructive/15 p-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-destructive">고위험 초과 지출 경고</CardTitle>
                <CardDescription className="mt-1">Category: 게임</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-foreground/90">
            <p>{aiAdvice}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>카테고리별 팁</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary">식비</Badge>
                <div className="space-y-1 text-sm">
                  <div className="text-foreground/90 text-sm">
                    Unusual transaction of $350 at 'Electronics Store' on Nov 20. in the last week. due in 3 days. You
                    should review your spending habits.
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary">거주</Badge>
                <div className="space-y-1 text-sm">
                  <div className="text-foreground/90 text-sm">
                    Credit card balance increased by 15% and you should review your spending habits. But you should not
                    worry about it.
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary">게임</Badge>
                <div className="space-y-1 text-sm">
                  <div className="text-foreground/90 text-sm">
                    Upcoming bill: Netflix ($15.99) and you should not worry about it. But you should review your
                    spending habits.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
