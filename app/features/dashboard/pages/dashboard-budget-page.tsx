import type { Route } from "./+types/dashboard-budget-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { TabsContent } from "~/common/components/ui/tabs";
import { currency } from "~/features/settings/utils/util";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";
import { DateTime } from "luxon";
import { createClient } from "~/client";
import { findAgentAdvices, findBudgets } from "~/features/expenses/lib/loader-helpers";
import { AdviceTag, AdviceType, type BudgetDto } from "~/graphql/__generated__/graphql";
import { Badge } from "~/common/components/ui/badge";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard - Budget" }];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const today = DateTime.now();
  const thisYear = today.year;
  const thisMonth = today.month;
  const { client } = createClient(request);
  const {
    findBudgets: { budgets },
  } = await findBudgets(client, { year: thisYear, month: thisMonth });
  const {
    findAdvices: { advices },
  } = await findAgentAdvices(client);
  const categoryAdvices = advices?.filter((advice) => advice.type === AdviceType.CategoryTips && advice.tag != null);
  return { budgets: budgets ?? [], advices: categoryAdvices ?? [] };
};
const statusColor: Record<AdviceTag, string> = {
  ON_TRACK: "text-emerald-600",
  WATCH: "text-blue-600",
  WARNING: "text-amber-600",
  OVERRUN: "text-red-600",
};

function StatusIcon({ status }: { status: AdviceTag }) {
  const base = "h-5 w-5";
  switch (status) {
    case "ON_TRACK":
      return <CheckCircle2 className={`${base} text-emerald-500`} />;
    case "WATCH":
      return <AlertCircle className={`${base} text-blue-500`} />;
    case "WARNING":
      return <AlertTriangle className={`${base} text-amber-500`} />;
    case "OVERRUN":
      return <AlertTriangle className={`${base} text-red-500`} />;
  }
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

export default function DashboardBudgetPage({ loaderData }: Route.ComponentProps) {
  const { budgets, advices } = loaderData;

  return (
    <TabsContent value="budget" className="space-y-6 mt-4">
      <div className="grid gap-6 md:grid-cols-2">
        {/* 월간 예산 현황 */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>월간 예산 현황</CardTitle>
            <CardDescription>각 카테고리별 예산과 지출 현황을 확인할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {budgets.map((budget) => (
              <BudgetBar key={budget.id} budget={budget} />
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* 예산 상태 표시 */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="">예산 상태</CardTitle>
            <CardDescription>각 카테고리별 예산 상태를 확인할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {advices.map(({ id, type, tag, categoryName, adviceText }) => (
                <div key={id} className="flex items-center justify-between gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-3">
                    <StatusIcon status={tag ?? AdviceTag.OnTrack} />
                    <span className="text-sm">
                      {categoryName}
                      <span className="hidden sm:inline">:</span>
                    </span>
                  </div>

                  <div className={`text-sm ${statusColor[tag ?? AdviceTag.OnTrack]} text-right`}>{tag}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>카테고리별 팁</CardTitle>
            <CardDescription>각 카테고리별 팁을 확인할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-rows">
              {advices.map(({ id, type, tag, categoryName, adviceText }) => (
                <div key={id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary">{categoryName}</Badge>
                    <div className="space-y-1 text-sm">
                      <div className="text-foreground/90 text-sm">{adviceText}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
