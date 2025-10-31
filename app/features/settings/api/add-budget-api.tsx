import type { Route } from "./+types/add-budget-api";
import { createClient } from "~/client";
import { z } from "zod";
import { upsertBudget } from "~/features/expenses/lib/loader-helpers";

const upsertBudgetSchema = z.object({
  categoryId: z.coerce.number(),
  allocated: z.coerce.number().min(0),
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = upsertBudgetSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }

  const { categoryId, allocated, year, month } = parsedData.data;
  const response = await upsertBudget(client, { categoryId, totalAmount: allocated, year: year, month: month });
  if (!response.upsertBudget.ok) {
    console.log(response.upsertBudget.error, ":response.upsertBudget.error from action");
    return { ok: false, error: response.upsertBudget.error };
  }
  return { ok: true };
};
