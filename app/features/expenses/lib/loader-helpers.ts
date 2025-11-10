import { z } from "zod";
import { DateTime } from "luxon";
import type { GraphQLClient } from "graphql-request";
import type {
  CreateExpenseInput,
  CreateExpenseMutation,
  CreateExpenseMutationVariables,
  DeleteBudgetInput,
  DeleteBudgetMutation,
  DeleteBudgetMutationVariables,
  DeleteExpenseInput,
  DeleteExpenseMutation,
  DeleteExpenseMutationVariables,
  FindAccountsQuery,
  FindAccountsQueryVariables,
  FindAgentAdvicesQuery,
  FindAgentAdvicesQueryVariables,
  FindBudgetInput,
  FindBudgetsQuery,
  FindBudgetsQueryVariables,
  FindCategoriesQuery,
  FindCategoriesQueryVariables,
  FindExpensesQuery,
  FindExpensesQueryVariables,
  FindMonthlyExpenseTotalQuery,
  FindMonthlyExpenseTotalQueryVariables,
  FindSummaryInput,
  FindSummaryQuery,
  FindSummaryQueryVariables,
  MeQuery,
  MeQueryVariables,
  UpdateExpenseInput,
  UpdateExpenseMutation,
  UpdateExpenseMutationVariables,
  UpsertBudgetInput,
  UpsertBudgetMutation,
  UpsertBudgetMutationVariables,
} from "~/graphql/__generated__/graphql";
import {
  CREATE_EXPENSE_MUTATION,
  DELETE_BUDGET_MUTATION,
  DELETE_EXPENSE_MUTATION,
  FIND_ACCOUNTS_QUERY,
  FIND_AGENT_ADVICES_QUERY,
  FIND_BUDGETS_QUERY,
  FIND_CATEGORIES_QUERY,
  FIND_EXPENSES_QUERY,
  FIND_MONTHLY_EXPENSE_TOTAL_QUERY,
  FIND_SUMMARY_QUERY,
  ME_QUERY,
  UPDATE_EXPENSE_MUTATION,
  UPSERT_BUDGET_MUTATION,
} from "~/graphql/queries";

const paramSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

const searchParamsSchema = z.object({
  page: z.coerce.number().optional().default(1),
});

export function parseSearchParamsOrThrow(url: string): { page: number } {
  const result = searchParamsSchema.safeParse(Object.fromEntries(new URL(url).searchParams));
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
}

export function parseParamsOrThrow(params: unknown): { year: number; month: number } {
  const result = paramSchema.safeParse(params);
  if (!result.success) {
    throw new Error("Invalid parameters");
  }
  return result.data;
}

export function isFutureMonth(year: number, month: number): boolean {
  const now = DateTime.now();
  return year > now.year || (year === now.year && month > now.month);
}

export async function findMonthlyExpenseTotal(client: GraphQLClient, year: number, months: number[]) {
  return client.request<FindMonthlyExpenseTotalQuery, FindMonthlyExpenseTotalQueryVariables>(
    FIND_MONTHLY_EXPENSE_TOTAL_QUERY,
    {
      findMonthlyExpenseTotalInput: {
        year,
        months,
      },
    },
  );
}

export async function getLoggedInUser(client: GraphQLClient) {
  const {
    me: { user },
  } = await client.request<MeQuery, MeQueryVariables>(ME_QUERY);
  return user ?? null;
}

export async function fetchMonthlyExpenses(client: GraphQLClient, year: number, month: number, page: number) {
  return client.request<FindExpensesQuery, FindExpensesQueryVariables>(FIND_EXPENSES_QUERY, {
    findExpenseMonthlyInput: {
      year,
      month,
      skip: (page - 1) * 10,
      take: 10,
    },
  });
}

export async function findCategories(client: GraphQLClient) {
  return client.request<FindCategoriesQuery, FindCategoriesQueryVariables>(FIND_CATEGORIES_QUERY);
}

export async function findAccounts(client: GraphQLClient) {
  return client.request<FindAccountsQuery, FindAccountsQueryVariables>(FIND_ACCOUNTS_QUERY);
}

export async function createExpense(client: GraphQLClient, input: CreateExpenseInput) {
  return client.request<CreateExpenseMutation, CreateExpenseMutationVariables>(CREATE_EXPENSE_MUTATION, {
    createExpenseInput: input,
  });
}

export async function updateExpense(client: GraphQLClient, input: UpdateExpenseInput) {
  return client.request<UpdateExpenseMutation, UpdateExpenseMutationVariables>(UPDATE_EXPENSE_MUTATION, {
    updateExpenseInput: input,
  });
}

export async function deleteExpense(client: GraphQLClient, input: DeleteExpenseInput) {
  return client.request<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DELETE_EXPENSE_MUTATION, {
    deleteExpenseInput: input,
  });
}

export async function findBudgets(client: GraphQLClient, input: FindBudgetInput) {
  return client.request<FindBudgetsQuery, FindBudgetsQueryVariables>(FIND_BUDGETS_QUERY, {
    findBudgetInput: input,
  });
}

export async function upsertBudget(client: GraphQLClient, input: UpsertBudgetInput) {
  return client.request<UpsertBudgetMutation, UpsertBudgetMutationVariables>(UPSERT_BUDGET_MUTATION, {
    upsertBudgetInput: input,
  });
}

export async function deleteBudget(client: GraphQLClient, input: DeleteBudgetInput) {
  return client.request<DeleteBudgetMutation, DeleteBudgetMutationVariables>(DELETE_BUDGET_MUTATION, {
    deleteBudgetInput: input,
  });
}

export async function findSummary(client: GraphQLClient, input: FindSummaryInput) {
  return client.request<FindSummaryQuery, FindSummaryQueryVariables>(FIND_SUMMARY_QUERY, {
    findSummaryInput: input,
  });
}

export async function findAgentAdvices(client: GraphQLClient) {
  return client.request<FindAgentAdvicesQuery, FindAgentAdvicesQueryVariables>(FIND_AGENT_ADVICES_QUERY);
}
