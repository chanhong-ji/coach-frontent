import type { Route } from "./+types/add-account-api";
import { createClient } from "~/client";
import { z } from "zod";
import { AccountType } from "~/graphql/__generated__/graphql";
import { createAccount } from "../utils/action-helpers";

const createAccountSchema = z.object({
  name: z.coerce.string().min(1),
  type: z.enum(Object.values(AccountType)),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = createAccountSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }

  const { name, type } = parsedData.data;
  const response = await createAccount(client, { name, type });
  if (!response.createAccount.ok) {
    console.log(response.createAccount.error, ":response.createAccount.error from action");
    return { ok: false, error: response.createAccount.error };
  }

  return { ok: true };
};
