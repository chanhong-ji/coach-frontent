import { createClient } from "~/client";
import type { Route } from "./+types/delete-category-api";
import { deleteCategory } from "../utils/action-helpers";

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = createClient(request);
  const formData = await request.formData();
  const categoryId = formData.get("categoryId");

  if (!categoryId) {
    console.log("categoryId is required");
    return { ok: false, error: "Category ID is required" };
  }
  const response = await deleteCategory(client, { id: Number(categoryId) });
  if (!response.deleteCategory.ok) {
    console.log(response.deleteCategory.error, ":response.deleteCategory.error from action");
    return { ok: false, error: response.deleteCategory.error };
  }
  return { ok: true };
};

export default function DeleteCategoryActionOnlyRoute() {
  return null;
}
