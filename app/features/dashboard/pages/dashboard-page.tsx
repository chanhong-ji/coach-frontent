import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/common/components/ui/tabs";
import { SummaryTab } from "../tabs/summary-tab";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-6xl p-4 md:p-6 space-y-6">
      <Tabs defaultValue="summary" className="">
        <div className="">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="summary">Summary & Insights</TabsTrigger>
            <TabsTrigger value="budget">Budget & Alerts</TabsTrigger>
            <TabsTrigger value="coach">AI Coach & Recurring</TabsTrigger>
          </TabsList>
        </div>

        <SummaryTab />
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
