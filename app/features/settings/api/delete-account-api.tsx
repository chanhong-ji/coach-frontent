import type { Route } from "./+types/delete-account-api";
import { createClient } from "~/client";
import { deleteAccount } from "../utils/action-helpers";

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const accountId = formData.get("accountId");

  if (!accountId) {
    console.log("accountId is required");
    return { ok: false, error: "Account ID is required" };
  }

  const response = await deleteAccount(client, { id: Number(accountId) });
  if (!response.deleteAccount.ok) {
    console.log(response.deleteAccount.error, ":response.deleteAccount.error from action");
    return { ok: false, error: response.deleteAccount.error };
  }
  return { ok: true };
};
