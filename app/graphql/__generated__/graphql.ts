/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown };
};

export type AccountDto = {
  __typename: "AccountDto";
  /** 결제 수단 생성 일시 */
  createdAt: Scalars["DateTime"]["output"];
  /** 결제 수단 ID */
  id: Scalars["Int"]["output"];
  /** 결제 수단 활성 여부 */
  isActive: Scalars["Boolean"]["output"];
  /** 결제 수단 이름 */
  name: Scalars["String"]["output"];
  /** 결제 수단 타입 (은행 계좌, 현금, 카드, 기타) */
  type: AccountType;
  /** 결제 수단 수정 일시 */
  updatedAt: Scalars["DateTime"]["output"];
};

export enum AccountType {
  Bank = "BANK",
  Card = "CARD",
  Cash = "CASH",
  Other = "OTHER",
}

export type BudgetDto = {
  __typename: "BudgetDto";
  /** 카테고리 */
  category: Maybe<CategoryDto>;
  /** 예산 ID */
  id: Scalars["Int"]["output"];
  /** 예산 금액 */
  totalAmount: Scalars["Float"]["output"];
  /** 년월 */
  yearMonth: Scalars["String"]["output"];
};

export type CategoryDto = {
  __typename: "CategoryDto";
  /** 카테고리 ID */
  id: Scalars["Int"]["output"];
  /** 카테고리 이름 */
  name: Scalars["String"]["output"];
  /** 정렬 순서 */
  sortOrder: Scalars["Int"]["output"];
};

export type CategoryExpense = {
  __typename: "CategoryExpense";
  /** 카테고리 ID */
  categoryId: Scalars["Int"]["output"];
  /** 총 지출 */
  totalExpense: Scalars["Float"]["output"];
};

export type CreateAccountInput = {
  /** 결제 수단 이름 */
  name: Scalars["String"]["input"];
  /** 결제 수단 타입 */
  type: AccountType;
};

export type CreateAccountOutput = {
  __typename: "CreateAccountOutput";
  account: Maybe<AccountDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateCategoryInput = {
  /** 카테고리 이름 */
  name: Scalars["String"]["input"];
};

export type CreateCategoryOutput = {
  __typename: "CreateCategoryOutput";
  /** 생성된 카테고리 */
  category: Maybe<CategoryDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateExpenseInput = {
  /** 결제 수단 ID */
  accountId: Scalars["Int"]["input"];
  /** 지출 금액 */
  amount: Scalars["Float"]["input"];
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 메모 */
  memo?: InputMaybe<Scalars["String"]["input"]>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 이름 */
  name: Scalars["String"]["input"];
  /** 지출 날짜 */
  postedAt: Scalars["DateTime"]["input"];
};

export type CreateExpenseOutput = {
  __typename: "CreateExpenseOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 지출 내역 */
  expense: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type CreateUserInput = {
  /** 이메일 */
  email: Scalars["String"]["input"];
  /** 이름 */
  name: Scalars["String"]["input"];
  /** 비밀번호 */
  password: Scalars["String"]["input"];
};

export type CreateUserOutput = {
  __typename: "CreateUserOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 생성된 유저 아이디 */
  userId: Maybe<Scalars["Int"]["output"]>;
};

export type DeleteAccountInput = {
  /** 결제 수단 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteAccountOutput = {
  __typename: "DeleteAccountOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteBudgetInput = {
  /** 예산 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteBudgetOutput = {
  __typename: "DeleteBudgetOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type DeleteCategoryInput = {
  /** 카테고리 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteCategoryOutput = {
  __typename: "DeleteCategoryOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteExpenseInput = {
  /** 지출 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteExpenseOutput = {
  __typename: "DeleteExpenseOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ExpenseDto = {
  __typename: "ExpenseDto";
  /** 계좌 ID */
  accountId: Maybe<Scalars["Int"]["output"]>;
  /** 지출 금액 */
  amount: Scalars["Float"]["output"];
  /** 카테고리 ID */
  categoryId: Maybe<Scalars["Int"]["output"]>;
  /** 지출 ID */
  id: Scalars["Int"]["output"];
  /** 메모 */
  memo: Maybe<Scalars["String"]["output"]>;
  /** 상점 ID */
  merchantId: Maybe<Scalars["Int"]["output"]>;
  /** 상점 이름 */
  merchantText: Maybe<Scalars["String"]["output"]>;
  /** 지출 이름 */
  name: Scalars["String"]["output"];
  /** 지출 날짜 */
  postedAt: Scalars["DateTime"]["output"];
};

export type FindAccountsOutput = {
  __typename: "FindAccountsOutput";
  /** 결제 수단 목록 */
  accounts: Maybe<Array<AccountDto>>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type FindBudgetInput = {
  /** 월 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindBudgetOutput = {
  __typename: "FindBudgetOutput";
  /** 예산 목록 */
  budgets: Maybe<Array<BudgetDto>>;
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type FindCategoriesOutput = {
  __typename: "FindCategoriesOutput";
  /** 카테고리 목록 */
  categories: Maybe<Array<CategoryDto>>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type FindCategoryMonthlyExpenseInput = {
  /** 월 목록 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindCategoryMonthlyExpenseOutput = {
  __typename: "FindCategoryMonthlyExpenseOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  result: Maybe<Array<CategoryExpense>>;
};

export type FindExpenseMonthlyInput = {
  /** 결제 수단 ID */
  accountIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** 카테고리 ID */
  categoryIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** 월 */
  month: Scalars["Int"]["input"];
  /** 건너뛸 건수 */
  skip: Scalars["Int"]["input"];
  /** 조회할 건수 */
  take: Scalars["Int"]["input"];
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindExpenseMonthlyOutput = {
  __typename: "FindExpenseMonthlyOutput";
  error: Maybe<Scalars["String"]["output"]>;
  /** 지출 목록 */
  expenses: Maybe<Array<ExpenseDto>>;
  ok: Scalars["Boolean"]["output"];
  /** 총 건수 */
  totalCount: Maybe<Scalars["Int"]["output"]>;
};

export type FindMonthlyExpenseTotalInput = {
  /** 월 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindMonthlyExpenseTotalOutput = {
  __typename: "FindMonthlyExpenseTotalOutput";
  error: Maybe<Scalars["String"]["output"]>;
  /** 월별 지출 합계 목록 */
  months: Maybe<Array<MonthlyExpenseTotalDto>>;
  ok: Scalars["Boolean"]["output"];
};

export type LoginInput = {
  /** 이메일 */
  email: Scalars["String"]["input"];
  /** 비밀번호 */
  password: Scalars["String"]["input"];
};

export type LoginOutput = {
  __typename: "LoginOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 토큰 */
  token: Maybe<Scalars["String"]["output"]>;
  /** 사용자 ID */
  userId: Maybe<Scalars["Int"]["output"]>;
};

export type MeDto = {
  __typename: "MeDto";
  /** 이메일 */
  email: Scalars["String"]["output"];
  /** 사용자 ID */
  id: Scalars["Int"]["output"];
  /** 이름 */
  name: Scalars["String"]["output"];
};

export type MeOutput = {
  __typename: "MeOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 사용자 정보 */
  user: Maybe<MeDto>;
};

export type MonthlyExpenseTotalDto = {
  __typename: "MonthlyExpenseTotalDto";
  /** 월 */
  month: Scalars["Int"]["output"];
  /** 총 건수 */
  totalCount: Scalars["Int"]["output"];
  /** 지출 합계 */
  totalExpense: Scalars["Float"]["output"];
};

export type Mutation = {
  __typename: "Mutation";
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createExpense: CreateExpenseOutput;
  createUser: CreateUserOutput;
  deleteAccount: DeleteAccountOutput;
  deleteBudget: DeleteBudgetOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteExpense: DeleteExpenseOutput;
  login: LoginOutput;
  logout: Scalars["Boolean"]["output"];
  updateAccount: UpdateAccountOutput;
  updateCategory: UpdateCategoryOutput;
  updateExpense: UpdateExpenseOutput;
  upsertBudget: UpsertBudgetOutput;
};

export type MutationCreateAccountArgs = {
  CreateAccountInput: CreateAccountInput;
};

export type MutationCreateCategoryArgs = {
  CreateCategoryInput: CreateCategoryInput;
};

export type MutationCreateExpenseArgs = {
  CreateExpenseInput: CreateExpenseInput;
};

export type MutationCreateUserArgs = {
  CreateUserInput: CreateUserInput;
};

export type MutationDeleteAccountArgs = {
  DeleteAccountInput: DeleteAccountInput;
};

export type MutationDeleteBudgetArgs = {
  DeleteBudgetInput: DeleteBudgetInput;
};

export type MutationDeleteCategoryArgs = {
  DeleteCategoryInput: DeleteCategoryInput;
};

export type MutationDeleteExpenseArgs = {
  DeleteExpenseInput: DeleteExpenseInput;
};

export type MutationLoginArgs = {
  LoginInput: LoginInput;
};

export type MutationUpdateAccountArgs = {
  UpdateAccountInput: UpdateAccountInput;
};

export type MutationUpdateCategoryArgs = {
  UpdateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateExpenseArgs = {
  UpdateExpenseInput: UpdateExpenseInput;
};

export type MutationUpsertBudgetArgs = {
  UpsertBudgetInput: UpsertBudgetInput;
};

export type Query = {
  __typename: "Query";
  findAccounts: FindAccountsOutput;
  findBudgets: FindBudgetOutput;
  findCategories: FindCategoriesOutput;
  findCategoryMonthlyExpense: FindCategoryMonthlyExpenseOutput;
  findExpenseMonthly: FindExpenseMonthlyOutput;
  findMonthlyExpenseTotal: FindMonthlyExpenseTotalOutput;
  me: MeOutput;
  test: Scalars["Boolean"]["output"];
};

export type QueryFindBudgetsArgs = {
  FindBudgetInput: FindBudgetInput;
};

export type QueryFindCategoryMonthlyExpenseArgs = {
  FindCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput;
};

export type QueryFindExpenseMonthlyArgs = {
  FindExpenseMonthlyInput: FindExpenseMonthlyInput;
};

export type QueryFindMonthlyExpenseTotalArgs = {
  FindMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput;
};

export type UpdateAccountInput = {
  /** 결제 수단 ID */
  id: Scalars["Int"]["input"];
  /** 결제 수단 활성 여부 */
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** 결제 수단 이름 */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** 결제 수단 타입 */
  type?: InputMaybe<AccountType>;
};

export type UpdateAccountOutput = {
  __typename: "UpdateAccountOutput";
  account: Maybe<AccountDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateCategoryInput = {
  /** 카테고리 ID */
  id: Scalars["Int"]["input"];
  /** 카테고리 이름 */
  name: Scalars["String"]["input"];
};

export type UpdateCategoryOutput = {
  __typename: "UpdateCategoryOutput";
  /** 수정된 카테고리 */
  category: Maybe<CategoryDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateExpenseInput = {
  /** 계좌 ID */
  accountId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 지출 금액 */
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 지출 ID */
  id: Scalars["Int"]["input"];
  /** 메모 */
  memo?: InputMaybe<Scalars["String"]["input"]>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 이름 */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 날짜 */
  postedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type UpdateExpenseOutput = {
  __typename: "UpdateExpenseOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 수정된 지출 */
  expense: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type UpsertBudgetInput = {
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 월 */
  month: Scalars["Int"]["input"];
  /** 예산 금액 */
  totalAmount: Scalars["Float"]["input"];
  /** 년 */
  year: Scalars["Int"]["input"];
};

export type UpsertBudgetOutput = {
  __typename: "UpsertBudgetOutput";
  /** 예산 */
  budget: Maybe<BudgetDto>;
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;

export type LoginMutation = {
  login: { __typename: "LoginOutput"; ok: boolean; error: string | null; token: string | null; userId: number | null };
};

export type CreateUserMutationVariables = Exact<{
  CreateUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: { __typename: "CreateUserOutput"; ok: boolean; error: string | null; userId: number | null };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    __typename: "MeOutput";
    ok: boolean;
    error: string | null;
    user: { __typename: "MeDto"; id: number; email: string; name: string } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: boolean };

export type FindAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAccountsQuery = {
  findAccounts: {
    __typename: "FindAccountsOutput";
    ok: boolean;
    error: string | null;
    accounts: Array<{
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    }> | null;
  };
};

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;

export type CreateAccountMutation = {
  createAccount: {
    __typename: "CreateAccountOutput";
    ok: boolean;
    error: string | null;
    account: {
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    } | null;
  };
};

export type UpdateAccountMutationVariables = Exact<{
  updateAccountInput: UpdateAccountInput;
}>;

export type UpdateAccountMutation = {
  updateAccount: {
    __typename: "UpdateAccountOutput";
    ok: boolean;
    error: string | null;
    account: {
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    } | null;
  };
};

export type DeleteAccountMutationVariables = Exact<{
  deleteAccountInput: DeleteAccountInput;
}>;

export type DeleteAccountMutation = {
  deleteAccount: { __typename: "DeleteAccountOutput"; ok: boolean; error: string | null };
};

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  createCategory: {
    __typename: "CreateCategoryOutput";
    ok: boolean;
    error: string | null;
    category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
  };
};

export type FindCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FindCategoriesQuery = {
  findCategories: {
    __typename: "FindCategoriesOutput";
    ok: boolean;
    error: string | null;
    categories: Array<{ __typename: "CategoryDto"; id: number; name: string; sortOrder: number }> | null;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  updateCategory: {
    __typename: "UpdateCategoryOutput";
    ok: boolean;
    error: string | null;
    category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryInput: DeleteCategoryInput;
}>;

export type DeleteCategoryMutation = {
  deleteCategory: { __typename: "DeleteCategoryOutput"; error: string | null; ok: boolean };
};

export type CreateExpenseMutationVariables = Exact<{
  createExpenseInput: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
  createExpense: {
    __typename: "CreateExpenseOutput";
    ok: boolean;
    error: string | null;
    expense: {
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    } | null;
  };
};

export type UpdateExpenseMutationVariables = Exact<{
  updateExpenseInput: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
  updateExpense: {
    __typename: "UpdateExpenseOutput";
    ok: boolean;
    error: string | null;
    expense: {
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    } | null;
  };
};

export type DeleteExpenseMutationVariables = Exact<{
  deleteExpenseInput: DeleteExpenseInput;
}>;

export type DeleteExpenseMutation = {
  deleteExpense: { __typename: "DeleteExpenseOutput"; ok: boolean; error: string | null };
};

export type FindExpensesWithCategoriesQueryVariables = Exact<{
  findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput;
}>;

export type FindExpensesWithCategoriesQuery = {
  findCategoryMonthlyExpense: {
    __typename: "FindCategoryMonthlyExpenseOutput";
    ok: boolean;
    error: string | null;
    result: Array<{ __typename: "CategoryExpense"; categoryId: number; totalExpense: number }> | null;
  };
};

export type FindMonthlyExpenseTotalQueryVariables = Exact<{
  findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput;
}>;

export type FindMonthlyExpenseTotalQuery = {
  findMonthlyExpenseTotal: {
    __typename: "FindMonthlyExpenseTotalOutput";
    ok: boolean;
    error: string | null;
    months: Array<{
      __typename: "MonthlyExpenseTotalDto";
      month: number;
      totalExpense: number;
      totalCount: number;
    }> | null;
  };
};

export type FindExpensesQueryVariables = Exact<{
  findExpenseMonthlyInput: FindExpenseMonthlyInput;
}>;

export type FindExpensesQuery = {
  findExpenseMonthly: {
    __typename: "FindExpenseMonthlyOutput";
    totalCount: number | null;
    ok: boolean;
    error: string | null;
    expenses: Array<{
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    }> | null;
  };
};

export type UpsertBudgetMutationVariables = Exact<{
  upsertBudgetInput: UpsertBudgetInput;
}>;

export type UpsertBudgetMutation = {
  upsertBudget: {
    __typename: "UpsertBudgetOutput";
    ok: boolean;
    error: string | null;
    budget: { __typename: "BudgetDto"; id: number; yearMonth: string; totalAmount: number } | null;
  };
};

export type DeleteBudgetMutationVariables = Exact<{
  deleteBudgetInput: DeleteBudgetInput;
}>;

export type DeleteBudgetMutation = {
  deleteBudget: { __typename: "DeleteBudgetOutput"; ok: boolean; error: string | null };
};

export type FindBudgetsQueryVariables = Exact<{
  findBudgetInput: FindBudgetInput;
}>;

export type FindBudgetsQuery = {
  findBudgets: {
    __typename: "FindBudgetOutput";
    ok: boolean;
    error: string | null;
    budgets: Array<{
      __typename: "BudgetDto";
      id: number;
      yearMonth: string;
      totalAmount: number;
      category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
    }> | null;
  };
};

export const LoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Login" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "LoginInput" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "LoginInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "login" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "LoginInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "LoginInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "CreateUserInput" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "CreateUserInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "CreateUserInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "CreateUserInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                { kind: "Field", name: { kind: "Name", value: "userId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: { kind: "SelectionSet", selections: [{ kind: "Field", name: { kind: "Name", value: "logout" } }] },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const FindAccountsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindAccounts" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findAccounts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "accounts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "isActive" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindAccountsQuery, FindAccountsQueryVariables>;
export const CreateAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "createAccountInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateAccountInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "CreateAccountInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "createAccountInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "account" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "isActive" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "updateAccountInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateAccountInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "UpdateAccountInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "updateAccountInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "account" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "isActive" } },
                      { kind: "Field", name: { kind: "Name", value: "type" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const DeleteAccountDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteAccount" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "deleteAccountInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteAccountInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAccount" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "DeleteAccountInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "deleteAccountInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const CreateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "createCategoryInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateCategoryInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "CreateCategoryInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "createCategoryInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const FindCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "categories" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindCategoriesQuery, FindCategoriesQueryVariables>;
export const UpdateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "updateCategoryInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateCategoryInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "UpdateCategoryInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "updateCategoryInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "deleteCategoryInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteCategoryInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "DeleteCategoryInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "deleteCategoryInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "error" } },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CreateExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "createExpenseInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateExpenseInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "CreateExpenseInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "createExpenseInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "expense" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "amount" } },
                      { kind: "Field", name: { kind: "Name", value: "postedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "accountId" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantText" } },
                      { kind: "Field", name: { kind: "Name", value: "memo" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const UpdateExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "updateExpenseInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateExpenseInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "UpdateExpenseInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "updateExpenseInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "expense" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "amount" } },
                      { kind: "Field", name: { kind: "Name", value: "postedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "accountId" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantText" } },
                      { kind: "Field", name: { kind: "Name", value: "memo" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const DeleteExpenseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteExpense" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "deleteExpenseInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteExpenseInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "DeleteExpenseInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "deleteExpenseInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const FindExpensesWithCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindExpensesWithCategories" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "findCategoryMonthlyExpenseInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "FindCategoryMonthlyExpenseInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findCategoryMonthlyExpense" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "FindCategoryMonthlyExpenseInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "findCategoryMonthlyExpenseInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "result" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                      { kind: "Field", name: { kind: "Name", value: "totalExpense" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindExpensesWithCategoriesQuery, FindExpensesWithCategoriesQueryVariables>;
export const FindMonthlyExpenseTotalDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindMonthlyExpenseTotal" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "findMonthlyExpenseTotalInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "FindMonthlyExpenseTotalInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findMonthlyExpenseTotal" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "FindMonthlyExpenseTotalInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "findMonthlyExpenseTotalInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "months" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "month" } },
                      { kind: "Field", name: { kind: "Name", value: "totalExpense" } },
                      { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindMonthlyExpenseTotalQuery, FindMonthlyExpenseTotalQueryVariables>;
export const FindExpensesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindExpenses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "findExpenseMonthlyInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "FindExpenseMonthlyInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findExpenseMonthly" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "FindExpenseMonthlyInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "findExpenseMonthlyInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "expenses" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "amount" } },
                      { kind: "Field", name: { kind: "Name", value: "postedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "accountId" } },
                      { kind: "Field", name: { kind: "Name", value: "categoryId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantId" } },
                      { kind: "Field", name: { kind: "Name", value: "merchantText" } },
                      { kind: "Field", name: { kind: "Name", value: "memo" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "totalCount" } },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindExpensesQuery, FindExpensesQueryVariables>;
export const UpsertBudgetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpsertBudget" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "upsertBudgetInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpsertBudgetInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "upsertBudget" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "UpsertBudgetInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "upsertBudgetInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "budget" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "yearMonth" } },
                      { kind: "Field", name: { kind: "Name", value: "totalAmount" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpsertBudgetMutation, UpsertBudgetMutationVariables>;
export const DeleteBudgetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteBudget" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "deleteBudgetInput" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DeleteBudgetInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteBudget" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "DeleteBudgetInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "deleteBudgetInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteBudgetMutation, DeleteBudgetMutationVariables>;
export const FindBudgetsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FindBudgets" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "findBudgetInput" } },
          type: { kind: "NonNullType", type: { kind: "NamedType", name: { kind: "Name", value: "FindBudgetInput" } } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "findBudgets" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "FindBudgetInput" },
                value: { kind: "Variable", name: { kind: "Name", value: "findBudgetInput" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "budgets" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "yearMonth" } },
                      { kind: "Field", name: { kind: "Name", value: "totalAmount" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "sortOrder" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FindBudgetsQuery, FindBudgetsQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown };
};

export type AccountDto = {
  __typename: "AccountDto";
  /** 결제 수단 생성 일시 */
  createdAt: Scalars["DateTime"]["output"];
  /** 결제 수단 ID */
  id: Scalars["Int"]["output"];
  /** 결제 수단 활성 여부 */
  isActive: Scalars["Boolean"]["output"];
  /** 결제 수단 이름 */
  name: Scalars["String"]["output"];
  /** 결제 수단 타입 (은행 계좌, 현금, 카드, 기타) */
  type: AccountType;
  /** 결제 수단 수정 일시 */
  updatedAt: Scalars["DateTime"]["output"];
};

export enum AccountType {
  Bank = "BANK",
  Card = "CARD",
  Cash = "CASH",
  Other = "OTHER",
}

export type BudgetDto = {
  __typename: "BudgetDto";
  /** 카테고리 */
  category: Maybe<CategoryDto>;
  /** 예산 ID */
  id: Scalars["Int"]["output"];
  /** 예산 금액 */
  totalAmount: Scalars["Float"]["output"];
  /** 년월 */
  yearMonth: Scalars["String"]["output"];
};

export type CategoryDto = {
  __typename: "CategoryDto";
  /** 카테고리 ID */
  id: Scalars["Int"]["output"];
  /** 카테고리 이름 */
  name: Scalars["String"]["output"];
  /** 정렬 순서 */
  sortOrder: Scalars["Int"]["output"];
};

export type CategoryExpense = {
  __typename: "CategoryExpense";
  /** 카테고리 ID */
  categoryId: Scalars["Int"]["output"];
  /** 총 지출 */
  totalExpense: Scalars["Float"]["output"];
};

export type CreateAccountInput = {
  /** 결제 수단 이름 */
  name: Scalars["String"]["input"];
  /** 결제 수단 타입 */
  type: AccountType;
};

export type CreateAccountOutput = {
  __typename: "CreateAccountOutput";
  account: Maybe<AccountDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateCategoryInput = {
  /** 카테고리 이름 */
  name: Scalars["String"]["input"];
};

export type CreateCategoryOutput = {
  __typename: "CreateCategoryOutput";
  /** 생성된 카테고리 */
  category: Maybe<CategoryDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type CreateExpenseInput = {
  /** 결제 수단 ID */
  accountId: Scalars["Int"]["input"];
  /** 지출 금액 */
  amount: Scalars["Float"]["input"];
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 메모 */
  memo?: InputMaybe<Scalars["String"]["input"]>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 이름 */
  name: Scalars["String"]["input"];
  /** 지출 날짜 */
  postedAt: Scalars["DateTime"]["input"];
};

export type CreateExpenseOutput = {
  __typename: "CreateExpenseOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 지출 내역 */
  expense: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type CreateUserInput = {
  /** 이메일 */
  email: Scalars["String"]["input"];
  /** 이름 */
  name: Scalars["String"]["input"];
  /** 비밀번호 */
  password: Scalars["String"]["input"];
};

export type CreateUserOutput = {
  __typename: "CreateUserOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 생성된 유저 아이디 */
  userId: Maybe<Scalars["Int"]["output"]>;
};

export type DeleteAccountInput = {
  /** 결제 수단 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteAccountOutput = {
  __typename: "DeleteAccountOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteBudgetInput = {
  /** 예산 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteBudgetOutput = {
  __typename: "DeleteBudgetOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type DeleteCategoryInput = {
  /** 카테고리 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteCategoryOutput = {
  __typename: "DeleteCategoryOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type DeleteExpenseInput = {
  /** 지출 ID */
  id: Scalars["Int"]["input"];
};

export type DeleteExpenseOutput = {
  __typename: "DeleteExpenseOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type ExpenseDto = {
  __typename: "ExpenseDto";
  /** 계좌 ID */
  accountId: Maybe<Scalars["Int"]["output"]>;
  /** 지출 금액 */
  amount: Scalars["Float"]["output"];
  /** 카테고리 ID */
  categoryId: Maybe<Scalars["Int"]["output"]>;
  /** 지출 ID */
  id: Scalars["Int"]["output"];
  /** 메모 */
  memo: Maybe<Scalars["String"]["output"]>;
  /** 상점 ID */
  merchantId: Maybe<Scalars["Int"]["output"]>;
  /** 상점 이름 */
  merchantText: Maybe<Scalars["String"]["output"]>;
  /** 지출 이름 */
  name: Scalars["String"]["output"];
  /** 지출 날짜 */
  postedAt: Scalars["DateTime"]["output"];
};

export type FindAccountsOutput = {
  __typename: "FindAccountsOutput";
  /** 결제 수단 목록 */
  accounts: Maybe<Array<AccountDto>>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type FindBudgetInput = {
  /** 월 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindBudgetOutput = {
  __typename: "FindBudgetOutput";
  /** 예산 목록 */
  budgets: Maybe<Array<BudgetDto>>;
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type FindCategoriesOutput = {
  __typename: "FindCategoriesOutput";
  /** 카테고리 목록 */
  categories: Maybe<Array<CategoryDto>>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type FindCategoryMonthlyExpenseInput = {
  /** 월 목록 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindCategoryMonthlyExpenseOutput = {
  __typename: "FindCategoryMonthlyExpenseOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  result: Maybe<Array<CategoryExpense>>;
};

export type FindExpenseMonthlyInput = {
  /** 결제 수단 ID */
  accountIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** 카테고리 ID */
  categoryIds?: InputMaybe<Array<Scalars["Int"]["input"]>>;
  /** 월 */
  month: Scalars["Int"]["input"];
  /** 건너뛸 건수 */
  skip: Scalars["Int"]["input"];
  /** 조회할 건수 */
  take: Scalars["Int"]["input"];
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindExpenseMonthlyOutput = {
  __typename: "FindExpenseMonthlyOutput";
  error: Maybe<Scalars["String"]["output"]>;
  /** 지출 목록 */
  expenses: Maybe<Array<ExpenseDto>>;
  ok: Scalars["Boolean"]["output"];
  /** 총 건수 */
  totalCount: Maybe<Scalars["Int"]["output"]>;
};

export type FindMonthlyExpenseTotalInput = {
  /** 월 */
  months: Array<Scalars["Int"]["input"]>;
  /** 연도 */
  year: Scalars["Int"]["input"];
};

export type FindMonthlyExpenseTotalOutput = {
  __typename: "FindMonthlyExpenseTotalOutput";
  error: Maybe<Scalars["String"]["output"]>;
  /** 월별 지출 합계 목록 */
  months: Maybe<Array<MonthlyExpenseTotalDto>>;
  ok: Scalars["Boolean"]["output"];
};

export type LoginInput = {
  /** 이메일 */
  email: Scalars["String"]["input"];
  /** 비밀번호 */
  password: Scalars["String"]["input"];
};

export type LoginOutput = {
  __typename: "LoginOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 토큰 */
  token: Maybe<Scalars["String"]["output"]>;
  /** 사용자 ID */
  userId: Maybe<Scalars["Int"]["output"]>;
};

export type MeDto = {
  __typename: "MeDto";
  /** 이메일 */
  email: Scalars["String"]["output"];
  /** 사용자 ID */
  id: Scalars["Int"]["output"];
  /** 이름 */
  name: Scalars["String"]["output"];
};

export type MeOutput = {
  __typename: "MeOutput";
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
  /** 사용자 정보 */
  user: Maybe<MeDto>;
};

export type MonthlyExpenseTotalDto = {
  __typename: "MonthlyExpenseTotalDto";
  /** 월 */
  month: Scalars["Int"]["output"];
  /** 총 건수 */
  totalCount: Scalars["Int"]["output"];
  /** 지출 합계 */
  totalExpense: Scalars["Float"]["output"];
};

export type Mutation = {
  __typename: "Mutation";
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createExpense: CreateExpenseOutput;
  createUser: CreateUserOutput;
  deleteAccount: DeleteAccountOutput;
  deleteBudget: DeleteBudgetOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteExpense: DeleteExpenseOutput;
  login: LoginOutput;
  logout: Scalars["Boolean"]["output"];
  updateAccount: UpdateAccountOutput;
  updateCategory: UpdateCategoryOutput;
  updateExpense: UpdateExpenseOutput;
  upsertBudget: UpsertBudgetOutput;
};

export type MutationCreateAccountArgs = {
  CreateAccountInput: CreateAccountInput;
};

export type MutationCreateCategoryArgs = {
  CreateCategoryInput: CreateCategoryInput;
};

export type MutationCreateExpenseArgs = {
  CreateExpenseInput: CreateExpenseInput;
};

export type MutationCreateUserArgs = {
  CreateUserInput: CreateUserInput;
};

export type MutationDeleteAccountArgs = {
  DeleteAccountInput: DeleteAccountInput;
};

export type MutationDeleteBudgetArgs = {
  DeleteBudgetInput: DeleteBudgetInput;
};

export type MutationDeleteCategoryArgs = {
  DeleteCategoryInput: DeleteCategoryInput;
};

export type MutationDeleteExpenseArgs = {
  DeleteExpenseInput: DeleteExpenseInput;
};

export type MutationLoginArgs = {
  LoginInput: LoginInput;
};

export type MutationUpdateAccountArgs = {
  UpdateAccountInput: UpdateAccountInput;
};

export type MutationUpdateCategoryArgs = {
  UpdateCategoryInput: UpdateCategoryInput;
};

export type MutationUpdateExpenseArgs = {
  UpdateExpenseInput: UpdateExpenseInput;
};

export type MutationUpsertBudgetArgs = {
  UpsertBudgetInput: UpsertBudgetInput;
};

export type Query = {
  __typename: "Query";
  findAccounts: FindAccountsOutput;
  findBudgets: FindBudgetOutput;
  findCategories: FindCategoriesOutput;
  findCategoryMonthlyExpense: FindCategoryMonthlyExpenseOutput;
  findExpenseMonthly: FindExpenseMonthlyOutput;
  findMonthlyExpenseTotal: FindMonthlyExpenseTotalOutput;
  me: MeOutput;
  test: Scalars["Boolean"]["output"];
};

export type QueryFindBudgetsArgs = {
  FindBudgetInput: FindBudgetInput;
};

export type QueryFindCategoryMonthlyExpenseArgs = {
  FindCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput;
};

export type QueryFindExpenseMonthlyArgs = {
  FindExpenseMonthlyInput: FindExpenseMonthlyInput;
};

export type QueryFindMonthlyExpenseTotalArgs = {
  FindMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput;
};

export type UpdateAccountInput = {
  /** 결제 수단 ID */
  id: Scalars["Int"]["input"];
  /** 결제 수단 활성 여부 */
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  /** 결제 수단 이름 */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** 결제 수단 타입 */
  type?: InputMaybe<AccountType>;
};

export type UpdateAccountOutput = {
  __typename: "UpdateAccountOutput";
  account: Maybe<AccountDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateCategoryInput = {
  /** 카테고리 ID */
  id: Scalars["Int"]["input"];
  /** 카테고리 이름 */
  name: Scalars["String"]["input"];
};

export type UpdateCategoryOutput = {
  __typename: "UpdateCategoryOutput";
  /** 수정된 카테고리 */
  category: Maybe<CategoryDto>;
  error: Maybe<Scalars["String"]["output"]>;
  ok: Scalars["Boolean"]["output"];
};

export type UpdateExpenseInput = {
  /** 계좌 ID */
  accountId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 지출 금액 */
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 지출 ID */
  id: Scalars["Int"]["input"];
  /** 메모 */
  memo?: InputMaybe<Scalars["String"]["input"]>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 이름 */
  name?: InputMaybe<Scalars["String"]["input"]>;
  /** 지출 날짜 */
  postedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type UpdateExpenseOutput = {
  __typename: "UpdateExpenseOutput";
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 수정된 지출 */
  expense: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type UpsertBudgetInput = {
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars["Int"]["input"]>;
  /** 월 */
  month: Scalars["Int"]["input"];
  /** 예산 금액 */
  totalAmount: Scalars["Float"]["input"];
  /** 년 */
  year: Scalars["Int"]["input"];
};

export type UpsertBudgetOutput = {
  __typename: "UpsertBudgetOutput";
  /** 예산 */
  budget: Maybe<BudgetDto>;
  /** 에러 메시지 */
  error: Maybe<Scalars["String"]["output"]>;
  /** 성공 여부 */
  ok: Scalars["Boolean"]["output"];
};

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;

export type LoginMutation = {
  login: { __typename: "LoginOutput"; ok: boolean; error: string | null; token: string | null; userId: number | null };
};

export type CreateUserMutationVariables = Exact<{
  CreateUserInput: CreateUserInput;
}>;

export type CreateUserMutation = {
  createUser: { __typename: "CreateUserOutput"; ok: boolean; error: string | null; userId: number | null };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  me: {
    __typename: "MeOutput";
    ok: boolean;
    error: string | null;
    user: { __typename: "MeDto"; id: number; email: string; name: string } | null;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { logout: boolean };

export type FindAccountsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAccountsQuery = {
  findAccounts: {
    __typename: "FindAccountsOutput";
    ok: boolean;
    error: string | null;
    accounts: Array<{
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    }> | null;
  };
};

export type CreateAccountMutationVariables = Exact<{
  createAccountInput: CreateAccountInput;
}>;

export type CreateAccountMutation = {
  createAccount: {
    __typename: "CreateAccountOutput";
    ok: boolean;
    error: string | null;
    account: {
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    } | null;
  };
};

export type UpdateAccountMutationVariables = Exact<{
  updateAccountInput: UpdateAccountInput;
}>;

export type UpdateAccountMutation = {
  updateAccount: {
    __typename: "UpdateAccountOutput";
    ok: boolean;
    error: string | null;
    account: {
      __typename: "AccountDto";
      id: number;
      name: string;
      isActive: boolean;
      type: AccountType;
      createdAt: unknown;
      updatedAt: unknown;
    } | null;
  };
};

export type DeleteAccountMutationVariables = Exact<{
  deleteAccountInput: DeleteAccountInput;
}>;

export type DeleteAccountMutation = {
  deleteAccount: { __typename: "DeleteAccountOutput"; ok: boolean; error: string | null };
};

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;

export type CreateCategoryMutation = {
  createCategory: {
    __typename: "CreateCategoryOutput";
    ok: boolean;
    error: string | null;
    category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
  };
};

export type FindCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type FindCategoriesQuery = {
  findCategories: {
    __typename: "FindCategoriesOutput";
    ok: boolean;
    error: string | null;
    categories: Array<{ __typename: "CategoryDto"; id: number; name: string; sortOrder: number }> | null;
  };
};

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;

export type UpdateCategoryMutation = {
  updateCategory: {
    __typename: "UpdateCategoryOutput";
    ok: boolean;
    error: string | null;
    category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
  };
};

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryInput: DeleteCategoryInput;
}>;

export type DeleteCategoryMutation = {
  deleteCategory: { __typename: "DeleteCategoryOutput"; error: string | null; ok: boolean };
};

export type CreateExpenseMutationVariables = Exact<{
  createExpenseInput: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
  createExpense: {
    __typename: "CreateExpenseOutput";
    ok: boolean;
    error: string | null;
    expense: {
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    } | null;
  };
};

export type UpdateExpenseMutationVariables = Exact<{
  updateExpenseInput: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
  updateExpense: {
    __typename: "UpdateExpenseOutput";
    ok: boolean;
    error: string | null;
    expense: {
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    } | null;
  };
};

export type DeleteExpenseMutationVariables = Exact<{
  deleteExpenseInput: DeleteExpenseInput;
}>;

export type DeleteExpenseMutation = {
  deleteExpense: { __typename: "DeleteExpenseOutput"; ok: boolean; error: string | null };
};

export type FindExpensesWithCategoriesQueryVariables = Exact<{
  findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput;
}>;

export type FindExpensesWithCategoriesQuery = {
  findCategoryMonthlyExpense: {
    __typename: "FindCategoryMonthlyExpenseOutput";
    ok: boolean;
    error: string | null;
    result: Array<{ __typename: "CategoryExpense"; categoryId: number; totalExpense: number }> | null;
  };
};

export type FindMonthlyExpenseTotalQueryVariables = Exact<{
  findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput;
}>;

export type FindMonthlyExpenseTotalQuery = {
  findMonthlyExpenseTotal: {
    __typename: "FindMonthlyExpenseTotalOutput";
    ok: boolean;
    error: string | null;
    months: Array<{
      __typename: "MonthlyExpenseTotalDto";
      month: number;
      totalExpense: number;
      totalCount: number;
    }> | null;
  };
};

export type FindExpensesQueryVariables = Exact<{
  findExpenseMonthlyInput: FindExpenseMonthlyInput;
}>;

export type FindExpensesQuery = {
  findExpenseMonthly: {
    __typename: "FindExpenseMonthlyOutput";
    totalCount: number | null;
    ok: boolean;
    error: string | null;
    expenses: Array<{
      __typename: "ExpenseDto";
      id: number;
      name: string;
      amount: number;
      postedAt: unknown;
      accountId: number | null;
      categoryId: number | null;
      merchantId: number | null;
      merchantText: string | null;
      memo: string | null;
    }> | null;
  };
};

export type UpsertBudgetMutationVariables = Exact<{
  upsertBudgetInput: UpsertBudgetInput;
}>;

export type UpsertBudgetMutation = {
  upsertBudget: {
    __typename: "UpsertBudgetOutput";
    ok: boolean;
    error: string | null;
    budget: { __typename: "BudgetDto"; id: number; yearMonth: string; totalAmount: number } | null;
  };
};

export type DeleteBudgetMutationVariables = Exact<{
  deleteBudgetInput: DeleteBudgetInput;
}>;

export type DeleteBudgetMutation = {
  deleteBudget: { __typename: "DeleteBudgetOutput"; ok: boolean; error: string | null };
};

export type FindBudgetsQueryVariables = Exact<{
  findBudgetInput: FindBudgetInput;
}>;

export type FindBudgetsQuery = {
  findBudgets: {
    __typename: "FindBudgetOutput";
    ok: boolean;
    error: string | null;
    budgets: Array<{
      __typename: "BudgetDto";
      id: number;
      yearMonth: string;
      totalAmount: number;
      category: { __typename: "CategoryDto"; id: number; name: string; sortOrder: number } | null;
    }> | null;
  };
};
