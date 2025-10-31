import type { Route } from "./+types/add-expense-api";
import { createClient } from "~/client";
import { z } from "zod";
import { createExpense } from "../lib/loader-helpers";

const createExpenseSchema = z.object({
  name: z.coerce.string().min(1),
  amount: z.coerce.number().min(0),
  date: z.coerce.date(),
  accountId: z.coerce.string(),
  categoryId: z.coerce.string(),
  memo: z.coerce.string().optional(),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = createExpenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    throw new Error("Invalid data");
  }

  const { name, amount, date, accountId, categoryId, memo } = parsedData.data;
  const response = await createExpense(client, {
    name,
    amount,
    postedAt: date.toISOString(),
    accountId: Number(accountId),
    categoryId: Number(categoryId),
    memo,
  });

  if (!response.createExpense.ok) {
    console.log(response.createExpense.error, ":response.createExpense.error from action");
    return { ok: false, error: response.createExpense.error };
  }
  return { ok: true };
};

export default function AddExpenseActionOnlyRoute() {
  return null;
}
