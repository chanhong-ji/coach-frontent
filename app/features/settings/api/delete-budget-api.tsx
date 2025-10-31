import type { Route } from "./+types/delete-budget-api";
import { createClient } from "~/client";
import { deleteBudget } from "~/features/expenses/lib/loader-helpers";

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const budgetId = formData.get("budgetId");

  if (!budgetId) {
    console.log("budgetId is required");
    return { ok: false, error: "Budget ID is required" };
  }

  const response = await deleteBudget(client, { id: Number(budgetId) });
  if (!response.deleteBudget.ok) {
    console.log(response.deleteBudget.error, ":response.deleteBudget.error from action");
    return { ok: false, error: response.deleteBudget.error };
  }
  return { ok: true };
};
