import { z } from "zod";
import { DateTime } from "luxon";
import type { GraphQLClient } from "graphql-request";
import type {
  CreateExpenseInput,
  CreateExpenseMutation,
  CreateExpenseMutationVariables,
  FindAccountsQuery,
  FindAccountsQueryVariables,
  FindCategoriesQuery,
  FindCategoriesQueryVariables,
  FindExpensesQuery,
  FindExpensesQueryVariables,
  FindMonthlyExpenseTotalQuery,
  FindMonthlyExpenseTotalQueryVariables,
} from "~/graphql/__generated__/graphql";
import {
  CREATE_EXPENSE_MUTATION,
  FIND_ACCOUNTS_QUERY,
  FIND_CATEGORIES_QUERY,
  FIND_EXPENSES_QUERY,
  FIND_MONTHLY_EXPENSE_TOTAL_QUERY,
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

export async function fetchMonthlyTotal(client: GraphQLClient, year: number, month: number) {
  return client.request<FindMonthlyExpenseTotalQuery, FindMonthlyExpenseTotalQueryVariables>(
    FIND_MONTHLY_EXPENSE_TOTAL_QUERY,
    {
      findMonthlyExpenseTotalInput: {
        year,
        months: [month],
      },
    },
  );
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

export async function fetchCategories(client: GraphQLClient) {
  return client.request<FindCategoriesQuery, FindCategoriesQueryVariables>(FIND_CATEGORIES_QUERY);
}

export async function fetchAccounts(client: GraphQLClient) {
  return client.request<FindAccountsQuery, FindAccountsQueryVariables>(FIND_ACCOUNTS_QUERY);
}

export async function createExpense(client: GraphQLClient, input: CreateExpenseInput) {
  return client.request<CreateExpenseMutation, CreateExpenseMutationVariables>(CREATE_EXPENSE_MUTATION, {
    createExpenseInput: input,
  });
}
