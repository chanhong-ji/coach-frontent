import type { GraphQLClient } from "graphql-request";
import type {
  CreateCategoryInput,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  UpdateCategoryInput,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  DeleteCategoryInput,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
} from "~/graphql/__generated__/graphql";
import { CREATE_CATEGORY_MUTATION, UPDATE_CATEGORY_MUTATION, DELETE_CATEGORY_MUTATION } from "~/graphql/queries";

export function createCategory(client: GraphQLClient, input: CreateCategoryInput) {
  return client.request<CreateCategoryMutation, CreateCategoryMutationVariables>(CREATE_CATEGORY_MUTATION, {
    createCategoryInput: input,
  });
}

export function updateCategory(client: GraphQLClient, input: UpdateCategoryInput) {
  return client.request<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UPDATE_CATEGORY_MUTATION, {
    updateCategoryInput: input,
  });
}

export function deleteCategory(client: GraphQLClient, input: DeleteCategoryInput) {
  return client.request<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DELETE_CATEGORY_MUTATION, {
    deleteCategoryInput: input,
  });
}
