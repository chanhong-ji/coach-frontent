import { createClient } from "~/client";
import type { Route } from "./+types/logout-page";
import { redirect } from "react-router";
import type { LogoutMutation, LogoutMutationVariables } from "~/graphql/__generated__/graphql";
import { LOGOUT_MUTATION } from "~/graphql/queries";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = createClient(request);
  const response = await client.rawRequest<LogoutMutation, LogoutMutationVariables>(LOGOUT_MUTATION);
  return redirect("/login", { headers: response.headers });
};
