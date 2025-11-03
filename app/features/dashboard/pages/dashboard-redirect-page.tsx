import { redirect } from "react-router";
import type { Route } from "./+types/dashboard-redirect-page";

export const meta: Route.MetaFunction = () => [{ title: "Dashboard" }];

export async function loader({}: Route.LoaderArgs) {
  return redirect("/dashboard/summary");
}

export default function DashboardRedirectPage() {
  return null;
}
