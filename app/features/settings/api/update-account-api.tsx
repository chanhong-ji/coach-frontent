import type { Route } from "./+types/update-account-api";
import { createClient } from "~/client";
import { z } from "zod";
import { updateAccount } from "../utils/action-helpers";
import { AccountType } from "~/graphql/__generated__/graphql";

const updateAccountSchema = z.object({
  id: z.coerce.number(),
  name: z.coerce.string().min(1),
  type: z.enum(Object.values(AccountType)),
  status: z.enum(["active", "inactive"]),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = updateAccountSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }

  const { id, name, type, status } = parsedData.data;
  const response = await updateAccount(client, { id, name, type, isActive: status === "active" ? true : false });
  if (!response.updateAccount.ok) {
    console.log(response.updateAccount.error, ":response.updateAccount.error from action");
    return { ok: false, error: response.updateAccount.error ?? "Unknown error" };
  }

  return { ok: true, account: response.updateAccount.account };
};
