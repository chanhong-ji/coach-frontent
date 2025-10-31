/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($LoginInput: LoginInput!) {\n    login(LoginInput: $LoginInput) {\n      ok\n      error\n      token\n      userId\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation CreateUser($CreateUserInput: CreateUserInput!) {\n    createUser(CreateUserInput: $CreateUserInput) {\n      ok\n      error\n      userId\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  query Me {\n    me {\n      ok\n      error\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n": typeof types.MeDocument,
    "\n  mutation Logout {\n    logout\n  }\n": typeof types.LogoutDocument,
    "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(CreateCategoryInput: $createCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": typeof types.CreateCategoryDocument,
    "\n  query FindCategories {\n    findCategories {\n      ok\n      error\n      categories {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": typeof types.FindCategoriesDocument,
    "\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(UpdateCategoryInput: $updateCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": typeof types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {\n    deleteCategory(DeleteCategoryInput: $deleteCategoryInput) {\n      error\n      ok\n    }\n  }\n": typeof types.DeleteCategoryDocument,
    "\n  mutation CreateExpense($createExpenseInput: CreateExpenseInput!) {\n    createExpense(CreateExpenseInput: $createExpenseInput) {\n      ok\n      error\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n    }\n  }\n": typeof types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($updateExpenseInput: UpdateExpenseInput!) {\n    updateExpense(UpdateExpenseInput: $updateExpenseInput) {\n      ok\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      error\n    }\n  }\n": typeof types.UpdateExpenseDocument,
    "\n  mutation DeleteExpense($deleteExpenseInput: DeleteExpenseInput!) {\n    deleteExpense(DeleteExpenseInput: $deleteExpenseInput) {\n      ok\n      error\n    }\n  }\n": typeof types.DeleteExpenseDocument,
    "\n  query FindExpensesWithCategories($findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput!) {\n    findCategoryMonthlyExpense(FindCategoryMonthlyExpenseInput: $findCategoryMonthlyExpenseInput) {\n      ok\n      error\n      result {\n        categoryId\n        totalExpense\n      }\n    }\n  }\n": typeof types.FindExpensesWithCategoriesDocument,
    "\n  query FindMonthlyExpenseTotal($findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput!) {\n    findMonthlyExpenseTotal(FindMonthlyExpenseTotalInput: $findMonthlyExpenseTotalInput) {\n      ok\n      error\n      months {\n        month\n        totalExpense\n        totalCount\n      }\n    }\n  }\n": typeof types.FindMonthlyExpenseTotalDocument,
    "\n  query FindExpenses($findExpenseMonthlyInput: FindExpenseMonthlyInput!) {\n    findExpenseMonthly(FindExpenseMonthlyInput: $findExpenseMonthlyInput) {\n      expenses {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      totalCount\n      ok\n      error\n    }\n  }\n": typeof types.FindExpensesDocument,
    "\n  mutation UpsertBudget($upsertBudgetInput: UpsertBudgetInput!) {\n    upsertBudget(UpsertBudgetInput: $upsertBudgetInput) {\n      ok\n      error\n      budget {\n        id\n        yearMonth\n        totalAmount\n      }\n    }\n  }\n": typeof types.UpsertBudgetDocument,
    "\n  mutation DeleteBudget($deleteBudgetInput: DeleteBudgetInput!) {\n    deleteBudget(DeleteBudgetInput: $deleteBudgetInput) {\n      ok\n      error\n    }\n  }\n": typeof types.DeleteBudgetDocument,
};
const documents: Documents = {
    "\n  mutation Login($LoginInput: LoginInput!) {\n    login(LoginInput: $LoginInput) {\n      ok\n      error\n      token\n      userId\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($CreateUserInput: CreateUserInput!) {\n    createUser(CreateUserInput: $CreateUserInput) {\n      ok\n      error\n      userId\n    }\n  }\n": types.CreateUserDocument,
    "\n  query Me {\n    me {\n      ok\n      error\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(CreateCategoryInput: $createCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": types.CreateCategoryDocument,
    "\n  query FindCategories {\n    findCategories {\n      ok\n      error\n      categories {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": types.FindCategoriesDocument,
    "\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(UpdateCategoryInput: $updateCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n": types.UpdateCategoryDocument,
    "\n  mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {\n    deleteCategory(DeleteCategoryInput: $deleteCategoryInput) {\n      error\n      ok\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  mutation CreateExpense($createExpenseInput: CreateExpenseInput!) {\n    createExpense(CreateExpenseInput: $createExpenseInput) {\n      ok\n      error\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n    }\n  }\n": types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($updateExpenseInput: UpdateExpenseInput!) {\n    updateExpense(UpdateExpenseInput: $updateExpenseInput) {\n      ok\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      error\n    }\n  }\n": types.UpdateExpenseDocument,
    "\n  mutation DeleteExpense($deleteExpenseInput: DeleteExpenseInput!) {\n    deleteExpense(DeleteExpenseInput: $deleteExpenseInput) {\n      ok\n      error\n    }\n  }\n": types.DeleteExpenseDocument,
    "\n  query FindExpensesWithCategories($findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput!) {\n    findCategoryMonthlyExpense(FindCategoryMonthlyExpenseInput: $findCategoryMonthlyExpenseInput) {\n      ok\n      error\n      result {\n        categoryId\n        totalExpense\n      }\n    }\n  }\n": types.FindExpensesWithCategoriesDocument,
    "\n  query FindMonthlyExpenseTotal($findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput!) {\n    findMonthlyExpenseTotal(FindMonthlyExpenseTotalInput: $findMonthlyExpenseTotalInput) {\n      ok\n      error\n      months {\n        month\n        totalExpense\n        totalCount\n      }\n    }\n  }\n": types.FindMonthlyExpenseTotalDocument,
    "\n  query FindExpenses($findExpenseMonthlyInput: FindExpenseMonthlyInput!) {\n    findExpenseMonthly(FindExpenseMonthlyInput: $findExpenseMonthlyInput) {\n      expenses {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      totalCount\n      ok\n      error\n    }\n  }\n": types.FindExpensesDocument,
    "\n  mutation UpsertBudget($upsertBudgetInput: UpsertBudgetInput!) {\n    upsertBudget(UpsertBudgetInput: $upsertBudgetInput) {\n      ok\n      error\n      budget {\n        id\n        yearMonth\n        totalAmount\n      }\n    }\n  }\n": types.UpsertBudgetDocument,
    "\n  mutation DeleteBudget($deleteBudgetInput: DeleteBudgetInput!) {\n    deleteBudget(DeleteBudgetInput: $deleteBudgetInput) {\n      ok\n      error\n    }\n  }\n": types.DeleteBudgetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($LoginInput: LoginInput!) {\n    login(LoginInput: $LoginInput) {\n      ok\n      error\n      token\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation Login($LoginInput: LoginInput!) {\n    login(LoginInput: $LoginInput) {\n      ok\n      error\n      token\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($CreateUserInput: CreateUserInput!) {\n    createUser(CreateUserInput: $CreateUserInput) {\n      ok\n      error\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($CreateUserInput: CreateUserInput!) {\n    createUser(CreateUserInput: $CreateUserInput) {\n      ok\n      error\n      userId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ok\n      error\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ok\n      error\n      user {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(CreateCategoryInput: $createCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {\n    createCategory(CreateCategoryInput: $createCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindCategories {\n    findCategories {\n      ok\n      error\n      categories {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindCategories {\n    findCategories {\n      ok\n      error\n      categories {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(UpdateCategoryInput: $updateCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {\n    updateCategory(UpdateCategoryInput: $updateCategoryInput) {\n      ok\n      error\n      category {\n        id\n        name\n        sortOrder\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {\n    deleteCategory(DeleteCategoryInput: $deleteCategoryInput) {\n      error\n      ok\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {\n    deleteCategory(DeleteCategoryInput: $deleteCategoryInput) {\n      error\n      ok\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateExpense($createExpenseInput: CreateExpenseInput!) {\n    createExpense(CreateExpenseInput: $createExpenseInput) {\n      ok\n      error\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateExpense($createExpenseInput: CreateExpenseInput!) {\n    createExpense(CreateExpenseInput: $createExpenseInput) {\n      ok\n      error\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateExpense($updateExpenseInput: UpdateExpenseInput!) {\n    updateExpense(UpdateExpenseInput: $updateExpenseInput) {\n      ok\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateExpense($updateExpenseInput: UpdateExpenseInput!) {\n    updateExpense(UpdateExpenseInput: $updateExpenseInput) {\n      ok\n      expense {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteExpense($deleteExpenseInput: DeleteExpenseInput!) {\n    deleteExpense(DeleteExpenseInput: $deleteExpenseInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteExpense($deleteExpenseInput: DeleteExpenseInput!) {\n    deleteExpense(DeleteExpenseInput: $deleteExpenseInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindExpensesWithCategories($findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput!) {\n    findCategoryMonthlyExpense(FindCategoryMonthlyExpenseInput: $findCategoryMonthlyExpenseInput) {\n      ok\n      error\n      result {\n        categoryId\n        totalExpense\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindExpensesWithCategories($findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput!) {\n    findCategoryMonthlyExpense(FindCategoryMonthlyExpenseInput: $findCategoryMonthlyExpenseInput) {\n      ok\n      error\n      result {\n        categoryId\n        totalExpense\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindMonthlyExpenseTotal($findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput!) {\n    findMonthlyExpenseTotal(FindMonthlyExpenseTotalInput: $findMonthlyExpenseTotalInput) {\n      ok\n      error\n      months {\n        month\n        totalExpense\n        totalCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query FindMonthlyExpenseTotal($findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput!) {\n    findMonthlyExpenseTotal(FindMonthlyExpenseTotalInput: $findMonthlyExpenseTotalInput) {\n      ok\n      error\n      months {\n        month\n        totalExpense\n        totalCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindExpenses($findExpenseMonthlyInput: FindExpenseMonthlyInput!) {\n    findExpenseMonthly(FindExpenseMonthlyInput: $findExpenseMonthlyInput) {\n      expenses {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      totalCount\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  query FindExpenses($findExpenseMonthlyInput: FindExpenseMonthlyInput!) {\n    findExpenseMonthly(FindExpenseMonthlyInput: $findExpenseMonthlyInput) {\n      expenses {\n        id\n        name\n        amount\n        postedAt\n        accountId\n        categoryId\n        merchantId\n        merchantText\n        memo\n      }\n      totalCount\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertBudget($upsertBudgetInput: UpsertBudgetInput!) {\n    upsertBudget(UpsertBudgetInput: $upsertBudgetInput) {\n      ok\n      error\n      budget {\n        id\n        yearMonth\n        totalAmount\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpsertBudget($upsertBudgetInput: UpsertBudgetInput!) {\n    upsertBudget(UpsertBudgetInput: $upsertBudgetInput) {\n      ok\n      error\n      budget {\n        id\n        yearMonth\n        totalAmount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBudget($deleteBudgetInput: DeleteBudgetInput!) {\n    deleteBudget(DeleteBudgetInput: $deleteBudgetInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteBudget($deleteBudgetInput: DeleteBudgetInput!) {\n    deleteBudget(DeleteBudgetInput: $deleteBudgetInput) {\n      ok\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;