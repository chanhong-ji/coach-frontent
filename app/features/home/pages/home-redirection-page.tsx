import { redirect } from "react-router";
import type { Route } from "./+types/home-redirection-page";
import { createClient } from "~/client";
import { getLoggedInUser } from "~/features/expenses/lib/loader-helpers";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = createClient(request);
  const user = await getLoggedInUser(client);
  if (user) {
    return redirect("/dashboard");
  }
  return redirect("/login");
}
