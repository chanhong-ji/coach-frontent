import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Separator } from "~/common/components/ui/separator";
import { Progress } from "~/common/components/ui/progress";
import { Info, Sparkles } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { TabsContent } from "~/common/components/ui/tabs";

// Fake data
const monthLabel = "November 2023";
const summary = {
  total: 2150.75,
  momDeltaPct: -5.3,
};

const topCategories = [
  { name: "Groceries", pct: 30, amount: 650 },
  { name: "Dining Out", pct: 22, amount: 480 },
  { name: "Utilities", pct: 14, amount: 300 },
  { name: "Transport", pct: 11, amount: 250 },
];

const spendingDaily = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 90 },
  { day: "Wed", amount: 160 },
  { day: "Thu", amount: 130 },
  { day: "Fri", amount: 190 },
  { day: "Sat", amount: 260 },
  { day: "Sun", amount: 180 },
];

const aiInsight = `Your financial overview for November shows a positive trend with a 5.3% decrease in overall spending. Groceries and Dining Out remain your top expenses. Consider reviewing your Dining Out budget for potential savings. Your daily spending patterns indicate higher expenses on weekends. The system detected an unusual large transaction of $350 on November 20th in 'Electronics', which is above your typical spending. Recurring subscriptions include Netflix ($15.99) and Spotify ($10.99), both due next week.`;

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export function SummaryTab() {
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
              {monthLabel}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="text-4xl font-semibold">{currency(summary.total)}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-red-600">
                  ↓ {Math.abs(summary.momDeltaPct).toFixed(2)}% decrease from last month
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="text-sm font-medium">Top Categories</div>
              <div className="space-y-4">
                {topCategories.map((c) => (
                  <div key={c.name} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span>{c.name}</span>
                        <Badge variant="secondary" className="rounded-full px-2 text-[10px]">
                          {c.pct}%
                        </Badge>
                      </div>
                      <span className="tabular-nums">{currency(c.amount)}</span>
                    </div>
                    <Progress value={c.pct} className="h-2" />
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

      {/* Daily Spending Patterns */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <CardTitle>Daily Spending Patterns</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingDaily} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
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
