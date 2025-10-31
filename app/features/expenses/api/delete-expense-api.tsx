import { createClient } from "~/client";
import type { Route } from "./+types/delete-expense-api";
import { deleteExpense } from "../lib/loader-helpers";

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const expenseId = formData.get("expenseId");

  if (!expenseId) {
    console.log("expenseId is required");
    throw new Error("expenseId is required");
  }

  const response = await deleteExpense(client, {
    id: Number(expenseId),
  });

  if (!response.deleteExpense.ok) {
    console.log(response.deleteExpense.error, ":response.deleteExpense.error from action");
    throw new Error(response.deleteExpense.error ?? "Unknown error");
  }

  return { ok: true };
};
