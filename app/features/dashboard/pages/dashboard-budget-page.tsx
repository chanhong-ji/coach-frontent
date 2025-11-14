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
import { requestAdvice } from "~/features/settings/utils/action-helpers";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "~/common/components/ui/sonner";
import { AiRequestButton } from "~/features/dashboard/components/ai-request-button";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard - Budget" }];

const ADVICE_REQUEST_KEY = "last-advice-request-time";

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

export default function DashboardBudgetPage({ loaderData, actionData }: Route.ComponentProps) {
  const { budgets, advices } = loaderData;
  const periodStart = advices?.[0]?.periodStart;
  const periodEnd = advices?.[0]?.periodEnd;

  // 요청 가능 여부와 쿨다운 체크는 버튼 컴포넌트 내부에서 수행합니다.

  useEffect(() => {
    if (!actionData) return;

    if (actionData.ok) {
      if (typeof window !== "undefined") {
        localStorage.setItem(ADVICE_REQUEST_KEY, DateTime.now().toISO());
        toast.success("AI 조언 요청이 완료되었습니다. 잠시 후 결과를 확인할 수 있습니다.");
      }
    } else if (actionData.error) {
      if (actionData.error === "ADVICE_TOTAL_COUNT_NOT_ENOUGH") {
        toast.error("AI 조언 생성을 위한 지출 내역이 부족합니다. 10개 이상의 지출 내역을 기록해주세요.");
      } else {
        toast.error(actionData.error);
      }
    }
  }, [actionData]);

  // canRequest는 버튼 내부에서 계산합니다.

  return (
    <TabsContent value="budget" className="space-y-6 mt-4">
      <Toaster />
      <div className="grid gap-6 md:grid-cols-3">
        {/* 월간 예산 현황 */}
        <Card className="col-span-1">
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
        <Card className="col-span-2">
          <CardHeader className="relative">
            <CardTitle className="flex">
              <h2 className="mr-2">카테고리별 예산 인사이트</h2>
              <p className="text-xs font-light text-gray-400">
                {periodStart} - {periodEnd}
              </p>
            </CardTitle>
            <CardDescription className="text-xs flex flex-col">
              <span>이번 달의 지출 데이터를 기반으로한 카테고리별 예산 사용률과 소비 비중 분석 결과입니다.</span>
              <span>AI가 각 항목의 초과 위험과 절약 여력을 진단해 구체적인 예산 조정 방향을 제안합니다.</span>
            </CardDescription>
            <AiRequestButton lastAdviceRequestTime={periodEnd} className="cursor-pointer" />
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

      <div className="grid gap-6 md:grid-cols-3">
        {/* 예산 상태 표시 */}
        {/* <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex">
              <h2 className="mr-2">지출 구조 분석</h2>
              <p className="text-xs font-light text-gray-400">
                {periodStart} - {periodEnd}
              </p>
            </CardTitle>
            <CardDescription className="text-xs"></CardDescription>
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
        </Card> */}

        {/* 카테고리별 팁 */}
      </div>
    </TabsContent>
  );
}
