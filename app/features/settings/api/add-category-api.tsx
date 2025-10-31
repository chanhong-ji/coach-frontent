import type { Route } from "./+types/add-category-api";
import { createClient } from "~/client";
import { createCategory } from "../utils/action-helpers";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.coerce.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = createCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }
  const { name } = parsedData.data;
  const response = await createCategory(client, { name });

  if (!response.createCategory.ok) {
    console.log(response.createCategory.error, ":response.createCategory.error from action");
    return { ok: false, error: response.createCategory.error };
  }

  return { ok: true };
};

export default function AddCategoryActionOnlyRoute() {
  return null;
}
