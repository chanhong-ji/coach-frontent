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
  CreateAccountInput,
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UpdateAccountInput,
  UpdateAccountMutation,
  UpdateAccountMutationVariables,
  DeleteAccountInput,
  DeleteAccountMutation,
  DeleteAccountMutationVariables,
} from "~/graphql/__generated__/graphql";
import {
  CREATE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  CREATE_ACCOUNT_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
  DELETE_ACCOUNT_MUTATION,
} from "~/graphql/queries";

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

export function createAccount(client: GraphQLClient, input: CreateAccountInput) {
  return client.request<CreateAccountMutation, CreateAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
    createAccountInput: input,
  });
}

export function updateAccount(client: GraphQLClient, input: UpdateAccountInput) {
  return client.request<UpdateAccountMutation, UpdateAccountMutationVariables>(UPDATE_ACCOUNT_MUTATION, {
    updateAccountInput: input,
  });
}

export function deleteAccount(client: GraphQLClient, input: DeleteAccountInput) {
  return client.request<DeleteAccountMutation, DeleteAccountMutationVariables>(DELETE_ACCOUNT_MUTATION, {
    deleteAccountInput: input,
  });
}
