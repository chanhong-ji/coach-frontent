import type { Route } from "./+types/update-category-api";
import { createClient } from "~/client";
import { updateCategory } from "../utils/action-helpers";
import { z } from "zod";

const updateCategorySchema = z.object({
  id: z.coerce.number(),
  name: z.coerce.string().min(1),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const parsedData = updateCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsedData.success) {
    console.log(parsedData.error, ":parsedData.error from action");
    return { ok: false, error: parsedData.error.message };
  }

  const { id, name } = parsedData.data;
  const response = await updateCategory(client, { id, name });
  if (!response.updateCategory.ok) {
    console.log(response.updateCategory.error, ":response.updateCategory.error from action");
    return { ok: false, error: response.updateCategory.error };
  }

  return { ok: true };
};

export default function UpdateCategoryActionOnlyRoute() {
  return null;
}
