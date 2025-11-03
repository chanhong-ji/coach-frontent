import type { Route } from "./+types/dashboard-coach-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard - Coach" }];

export const loader = async (_args: Route.LoaderArgs) => {
  return {};
};

export async function action({}: Route.ActionArgs) {
  return {};
}

export default function DashboardCoachPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Coach & Recurring</CardTitle>
        <CardDescription>Coming soon.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Example: chatbot, recurring subscription detection.
      </CardContent>
    </Card>
  );
}


