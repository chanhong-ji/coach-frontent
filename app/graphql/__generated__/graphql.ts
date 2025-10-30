/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
};

export type AccountDto = {
  __typename?: 'AccountDto';
  /** 결제 수단 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 결제 수단 ID */
  id: Scalars['Int']['output'];
  /** 결제 수단 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 결제 수단 이름 */
  name: Scalars['String']['output'];
  /** 결제 수단 타입 (은행 계좌, 현금, 카드, 기타) */
  type: AccountType;
  /** 결제 수단 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

export enum AccountType {
  Bank = 'BANK',
  Card = 'CARD',
  Cash = 'CASH',
  Other = 'OTHER'
}

export type BudgetDto = {
  __typename?: 'BudgetDto';
  /** 예산 ID */
  id: Scalars['Int']['output'];
  /** 예산 금액 */
  totalAmount: Scalars['Float']['output'];
  /** 년월 */
  yearMonth: Scalars['String']['output'];
};

export type CategoryDto = {
  __typename?: 'CategoryDto';
  /** 카테고리 ID */
  id: Scalars['Int']['output'];
  /** 카테고리 이름 */
  name: Scalars['String']['output'];
  /** 정렬 순서 */
  sortOrder: Scalars['Int']['output'];
};

export type CategoryExpense = {
  __typename?: 'CategoryExpense';
  /** 카테고리 ID */
  categoryId: Scalars['Int']['output'];
  /** 총 지출 */
  totalExpense: Scalars['Float']['output'];
};

export type CreateAccountInput = {
  /** 결제 수단 이름 */
  name: Scalars['String']['input'];
  /** 결제 수단 타입 */
  type: AccountType;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  account?: Maybe<AccountDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  /** 카테고리 이름 */
  name: Scalars['String']['input'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  /** 생성된 카테고리 */
  category?: Maybe<CategoryDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateExpenseInput = {
  /** 결제 수단 ID */
  accountId: Scalars['Int']['input'];
  /** 지출 금액 */
  amount: Scalars['Float']['input'];
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars['Int']['input']>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars['String']['input']>;
  /** 지출 이름 */
  name: Scalars['String']['input'];
  /** 지출 날짜 */
  postedAt: Scalars['DateTime']['input'];
};

export type CreateExpenseOutput = {
  __typename?: 'CreateExpenseOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 지출 내역 */
  expense?: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 이름 */
  name: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 생성된 유저 아이디 */
  userId?: Maybe<Scalars['Int']['output']>;
};

export type DeleteBudgetInput = {
  /** 예산 ID */
  id: Scalars['Int']['input'];
};

export type DeleteBudgetOutput = {
  __typename?: 'DeleteBudgetOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type DeleteCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['Int']['input'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteExpenseInput = {
  /** 지출 ID */
  id: Scalars['Int']['input'];
};

export type DeleteExpenseOutput = {
  __typename?: 'DeleteExpenseOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ExpenseDto = {
  __typename?: 'ExpenseDto';
  /** 계좌 ID */
  accountId?: Maybe<Scalars['Int']['output']>;
  /** 지출 금액 */
  amount: Scalars['Float']['output'];
  /** 카테고리 ID */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** 지출 ID */
  id: Scalars['Int']['output'];
  /** 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 상점 ID */
  merchantId?: Maybe<Scalars['Int']['output']>;
  /** 상점 이름 */
  merchantText?: Maybe<Scalars['String']['output']>;
  /** 지출 이름 */
  name: Scalars['String']['output'];
  /** 지출 날짜 */
  postedAt: Scalars['DateTime']['output'];
};

export type FindAccountsOutput = {
  __typename?: 'FindAccountsOutput';
  /** 결제 수단 목록 */
  accounts?: Maybe<Array<AccountDto>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type FindCategoriesOutput = {
  __typename?: 'FindCategoriesOutput';
  /** 카테고리 목록 */
  categories?: Maybe<Array<CategoryDto>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type FindCategoryMonthlyExpenseInput = {
  /** 월 목록 */
  months: Array<Scalars['Int']['input']>;
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindCategoryMonthlyExpenseOutput = {
  __typename?: 'FindCategoryMonthlyExpenseOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<CategoryExpense>>;
};

export type FindExpenseMonthlyInput = {
  /** 결제 수단 ID */
  accountIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 카테고리 ID */
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 월 */
  month: Scalars['Int']['input'];
  /** 건너뛸 건수 */
  skip: Scalars['Int']['input'];
  /** 조회할 건수 */
  take: Scalars['Int']['input'];
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindExpenseMonthlyOutput = {
  __typename?: 'FindExpenseMonthlyOutput';
  error?: Maybe<Scalars['String']['output']>;
  /** 지출 목록 */
  expenses?: Maybe<Array<ExpenseDto>>;
  ok: Scalars['Boolean']['output'];
  /** 총 건수 */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FindMonthlyExpenseTotalInput = {
  /** 월 */
  months: Array<Scalars['Int']['input']>;
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindMonthlyExpenseTotalOutput = {
  __typename?: 'FindMonthlyExpenseTotalOutput';
  error?: Maybe<Scalars['String']['output']>;
  /** 월별 지출 합계 목록 */
  months?: Maybe<Array<MonthlyExpenseTotalDto>>;
  ok: Scalars['Boolean']['output'];
};

export type LoginInput = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 토큰 */
  token?: Maybe<Scalars['String']['output']>;
  /** 사용자 ID */
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MeDto = {
  __typename?: 'MeDto';
  /** 이메일 */
  email: Scalars['String']['output'];
  /** 사용자 ID */
  id: Scalars['Int']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
};

export type MeOutput = {
  __typename?: 'MeOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 사용자 정보 */
  user?: Maybe<MeDto>;
};

export type MonthlyExpenseTotalDto = {
  __typename?: 'MonthlyExpenseTotalDto';
  /** 월 */
  month: Scalars['Int']['output'];
  /** 지출 합계 */
  totalExpense: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createExpense: CreateExpenseOutput;
  createUser: CreateUserOutput;
  deleteBudget: DeleteBudgetOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteExpense: DeleteExpenseOutput;
  login: LoginOutput;
  logout: Scalars['Boolean']['output'];
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
  __typename?: 'Query';
  findAccounts: FindAccountsOutput;
  findCategories: FindCategoriesOutput;
  findCategoryMonthlyExpense: FindCategoryMonthlyExpenseOutput;
  findExpenseMonthly: FindExpenseMonthlyOutput;
  findMonthlyExpenseTotal: FindMonthlyExpenseTotalOutput;
  me: MeOutput;
  test: Scalars['Boolean']['output'];
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
  id: Scalars['Int']['input'];
  /** 결제 수단 활성 여부 */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** 결제 수단 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 결제 수단 타입 */
  type?: InputMaybe<AccountType>;
};

export type UpdateAccountOutput = {
  __typename?: 'UpdateAccountOutput';
  account?: Maybe<AccountDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['Int']['input'];
  /** 카테고리 이름 */
  name: Scalars['String']['input'];
};

export type UpdateCategoryOutput = {
  __typename?: 'UpdateCategoryOutput';
  /** 수정된 카테고리 */
  category?: Maybe<CategoryDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateExpenseInput = {
  /** 계좌 ID */
  accountId?: InputMaybe<Scalars['Int']['input']>;
  /** 지출 금액 */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 지출 ID */
  id: Scalars['Int']['input'];
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars['Int']['input']>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars['String']['input']>;
  /** 지출 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 지출 날짜 */
  postedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateExpenseOutput = {
  __typename?: 'UpdateExpenseOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 수정된 지출 */
  expense?: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type UpsertBudgetInput = {
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 월 */
  month: Scalars['Int']['input'];
  /** 예산 금액 */
  totalAmount: Scalars['Float']['input'];
  /** 년 */
  year: Scalars['Int']['input'];
};

export type UpsertBudgetOutput = {
  __typename?: 'UpsertBudgetOutput';
  /** 예산 */
  budget?: Maybe<BudgetDto>;
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null, userId?: number | null } };

export type CreateUserMutationVariables = Exact<{
  CreateUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null, userId?: number | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, user?: { __typename?: 'MeDto', id: number, email: string, name: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"LoginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"LoginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"CreateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"CreateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"CreateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: unknown; output: unknown; }
};

export type AccountDto = {
  __typename?: 'AccountDto';
  /** 결제 수단 생성 일시 */
  createdAt: Scalars['DateTime']['output'];
  /** 결제 수단 ID */
  id: Scalars['Int']['output'];
  /** 결제 수단 활성 여부 */
  isActive: Scalars['Boolean']['output'];
  /** 결제 수단 이름 */
  name: Scalars['String']['output'];
  /** 결제 수단 타입 (은행 계좌, 현금, 카드, 기타) */
  type: AccountType;
  /** 결제 수단 수정 일시 */
  updatedAt: Scalars['DateTime']['output'];
};

export enum AccountType {
  Bank = 'BANK',
  Card = 'CARD',
  Cash = 'CASH',
  Other = 'OTHER'
}

export type BudgetDto = {
  __typename?: 'BudgetDto';
  /** 예산 ID */
  id: Scalars['Int']['output'];
  /** 예산 금액 */
  totalAmount: Scalars['Float']['output'];
  /** 년월 */
  yearMonth: Scalars['String']['output'];
};

export type CategoryDto = {
  __typename?: 'CategoryDto';
  /** 카테고리 ID */
  id: Scalars['Int']['output'];
  /** 카테고리 이름 */
  name: Scalars['String']['output'];
  /** 정렬 순서 */
  sortOrder: Scalars['Int']['output'];
};

export type CategoryExpense = {
  __typename?: 'CategoryExpense';
  /** 카테고리 ID */
  categoryId: Scalars['Int']['output'];
  /** 총 지출 */
  totalExpense: Scalars['Float']['output'];
};

export type CreateAccountInput = {
  /** 결제 수단 이름 */
  name: Scalars['String']['input'];
  /** 결제 수단 타입 */
  type: AccountType;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  account?: Maybe<AccountDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateCategoryInput = {
  /** 카테고리 이름 */
  name: Scalars['String']['input'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  /** 생성된 카테고리 */
  category?: Maybe<CategoryDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateExpenseInput = {
  /** 결제 수단 ID */
  accountId: Scalars['Int']['input'];
  /** 지출 금액 */
  amount: Scalars['Float']['input'];
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars['Int']['input']>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars['String']['input']>;
  /** 지출 이름 */
  name: Scalars['String']['input'];
  /** 지출 날짜 */
  postedAt: Scalars['DateTime']['input'];
};

export type CreateExpenseOutput = {
  __typename?: 'CreateExpenseOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 지출 내역 */
  expense?: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 이름 */
  name: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 생성된 유저 아이디 */
  userId?: Maybe<Scalars['Int']['output']>;
};

export type DeleteBudgetInput = {
  /** 예산 ID */
  id: Scalars['Int']['input'];
};

export type DeleteBudgetOutput = {
  __typename?: 'DeleteBudgetOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type DeleteCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['Int']['input'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type DeleteExpenseInput = {
  /** 지출 ID */
  id: Scalars['Int']['input'];
};

export type DeleteExpenseOutput = {
  __typename?: 'DeleteExpenseOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type ExpenseDto = {
  __typename?: 'ExpenseDto';
  /** 계좌 ID */
  accountId?: Maybe<Scalars['Int']['output']>;
  /** 지출 금액 */
  amount: Scalars['Float']['output'];
  /** 카테고리 ID */
  categoryId?: Maybe<Scalars['Int']['output']>;
  /** 지출 ID */
  id: Scalars['Int']['output'];
  /** 메모 */
  memo?: Maybe<Scalars['String']['output']>;
  /** 상점 ID */
  merchantId?: Maybe<Scalars['Int']['output']>;
  /** 상점 이름 */
  merchantText?: Maybe<Scalars['String']['output']>;
  /** 지출 이름 */
  name: Scalars['String']['output'];
  /** 지출 날짜 */
  postedAt: Scalars['DateTime']['output'];
};

export type FindAccountsOutput = {
  __typename?: 'FindAccountsOutput';
  /** 결제 수단 목록 */
  accounts?: Maybe<Array<AccountDto>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type FindCategoriesOutput = {
  __typename?: 'FindCategoriesOutput';
  /** 카테고리 목록 */
  categories?: Maybe<Array<CategoryDto>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type FindCategoryMonthlyExpenseInput = {
  /** 월 목록 */
  months: Array<Scalars['Int']['input']>;
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindCategoryMonthlyExpenseOutput = {
  __typename?: 'FindCategoryMonthlyExpenseOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  result?: Maybe<Array<CategoryExpense>>;
};

export type FindExpenseMonthlyInput = {
  /** 결제 수단 ID */
  accountIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 카테고리 ID */
  categoryIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** 월 */
  month: Scalars['Int']['input'];
  /** 건너뛸 건수 */
  skip: Scalars['Int']['input'];
  /** 조회할 건수 */
  take: Scalars['Int']['input'];
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindExpenseMonthlyOutput = {
  __typename?: 'FindExpenseMonthlyOutput';
  error?: Maybe<Scalars['String']['output']>;
  /** 지출 목록 */
  expenses?: Maybe<Array<ExpenseDto>>;
  ok: Scalars['Boolean']['output'];
  /** 총 건수 */
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type FindMonthlyExpenseTotalInput = {
  /** 월 */
  months: Array<Scalars['Int']['input']>;
  /** 연도 */
  year: Scalars['Int']['input'];
};

export type FindMonthlyExpenseTotalOutput = {
  __typename?: 'FindMonthlyExpenseTotalOutput';
  error?: Maybe<Scalars['String']['output']>;
  /** 월별 지출 합계 목록 */
  months?: Maybe<Array<MonthlyExpenseTotalDto>>;
  ok: Scalars['Boolean']['output'];
};

export type LoginInput = {
  /** 이메일 */
  email: Scalars['String']['input'];
  /** 비밀번호 */
  password: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 토큰 */
  token?: Maybe<Scalars['String']['output']>;
  /** 사용자 ID */
  userId?: Maybe<Scalars['Int']['output']>;
};

export type MeDto = {
  __typename?: 'MeDto';
  /** 이메일 */
  email: Scalars['String']['output'];
  /** 사용자 ID */
  id: Scalars['Int']['output'];
  /** 이름 */
  name: Scalars['String']['output'];
};

export type MeOutput = {
  __typename?: 'MeOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  /** 사용자 정보 */
  user?: Maybe<MeDto>;
};

export type MonthlyExpenseTotalDto = {
  __typename?: 'MonthlyExpenseTotalDto';
  /** 월 */
  month: Scalars['Int']['output'];
  /** 지출 합계 */
  totalExpense: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountOutput;
  createCategory: CreateCategoryOutput;
  createExpense: CreateExpenseOutput;
  createUser: CreateUserOutput;
  deleteBudget: DeleteBudgetOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteExpense: DeleteExpenseOutput;
  login: LoginOutput;
  logout: Scalars['Boolean']['output'];
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
  __typename?: 'Query';
  findAccounts: FindAccountsOutput;
  findCategories: FindCategoriesOutput;
  findCategoryMonthlyExpense: FindCategoryMonthlyExpenseOutput;
  findExpenseMonthly: FindExpenseMonthlyOutput;
  findMonthlyExpenseTotal: FindMonthlyExpenseTotalOutput;
  me: MeOutput;
  test: Scalars['Boolean']['output'];
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
  id: Scalars['Int']['input'];
  /** 결제 수단 활성 여부 */
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  /** 결제 수단 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 결제 수단 타입 */
  type?: InputMaybe<AccountType>;
};

export type UpdateAccountOutput = {
  __typename?: 'UpdateAccountOutput';
  account?: Maybe<AccountDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateCategoryInput = {
  /** 카테고리 ID */
  id: Scalars['Int']['input'];
  /** 카테고리 이름 */
  name: Scalars['String']['input'];
};

export type UpdateCategoryOutput = {
  __typename?: 'UpdateCategoryOutput';
  /** 수정된 카테고리 */
  category?: Maybe<CategoryDto>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type UpdateExpenseInput = {
  /** 계좌 ID */
  accountId?: InputMaybe<Scalars['Int']['input']>;
  /** 지출 금액 */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 지출 ID */
  id: Scalars['Int']['input'];
  /** 메모 */
  memo?: InputMaybe<Scalars['String']['input']>;
  /** 상점 ID */
  merchantId?: InputMaybe<Scalars['Int']['input']>;
  /** 상점 이름 */
  merchantText?: InputMaybe<Scalars['String']['input']>;
  /** 지출 이름 */
  name?: InputMaybe<Scalars['String']['input']>;
  /** 지출 날짜 */
  postedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateExpenseOutput = {
  __typename?: 'UpdateExpenseOutput';
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 수정된 지출 */
  expense?: Maybe<ExpenseDto>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type UpsertBudgetInput = {
  /** 카테고리 ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** 월 */
  month: Scalars['Int']['input'];
  /** 예산 금액 */
  totalAmount: Scalars['Float']['input'];
  /** 년 */
  year: Scalars['Int']['input'];
};

export type UpsertBudgetOutput = {
  __typename?: 'UpsertBudgetOutput';
  /** 예산 */
  budget?: Maybe<BudgetDto>;
  /** 에러 메시지 */
  error?: Maybe<Scalars['String']['output']>;
  /** 성공 여부 */
  ok: Scalars['Boolean']['output'];
};

export type LoginMutationVariables = Exact<{
  LoginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null, userId?: number | null } };

export type CreateUserMutationVariables = Exact<{
  CreateUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null, userId?: number | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeOutput', ok: boolean, error?: string | null, user?: { __typename?: 'MeDto', id: number, email: string, name: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };
