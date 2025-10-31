import { gql } from "graphql-request";

// AUTH

export const LOGIN_MUTATION = gql`
  mutation Login($LoginInput: LoginInput!) {
    login(LoginInput: $LoginInput) {
      ok
      error
      token
      userId
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($CreateUserInput: CreateUserInput!) {
    createUser(CreateUserInput: $CreateUserInput) {
      ok
      error
      userId
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      ok
      error
      user {
        id
        email
        name
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

// ACCOUNTS
export const FIND_ACCOUNTS_QUERY = gql`
  query FindAccounts {
    findAccounts {
      ok
      error
      accounts {
        id
        name
        isActive
        type
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($createAccountInput: CreateAccountInput!) {
    createAccount(CreateAccountInput: $createAccountInput) {
      ok
      error
      account {
        id
        name
        isActive
        type
        createdAt
        updatedAt
      }
    }
  }
`;

export const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UpdateAccount($updateAccountInput: UpdateAccountInput!) {
    updateAccount(UpdateAccountInput: $updateAccountInput) {
      ok
      error
      account {
        id
        name
        isActive
        type
        createdAt
        updatedAt
      }
    }
  }
`;
// CATEGORIES

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(CreateCategoryInput: $createCategoryInput) {
      ok
      error
      category {
        id
        name
        sortOrder
      }
    }
  }
`;

export const FIND_CATEGORIES_QUERY = gql`
  query FindCategories {
    findCategories {
      ok
      error
      categories {
        id
        name
        sortOrder
      }
    }
  }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(UpdateCategoryInput: $updateCategoryInput) {
      ok
      error
      category {
        id
        name
        sortOrder
      }
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($deleteCategoryInput: DeleteCategoryInput!) {
    deleteCategory(DeleteCategoryInput: $deleteCategoryInput) {
      error
      ok
    }
  }
`;

// EXPENSES

export const CREATE_EXPENSE_MUTATION = gql`
  mutation CreateExpense($createExpenseInput: CreateExpenseInput!) {
    createExpense(CreateExpenseInput: $createExpenseInput) {
      ok
      error
      expense {
        id
        name
        amount
        postedAt
        accountId
        categoryId
        merchantId
        merchantText
        memo
      }
    }
  }
`;

export const UPDATE_EXPENSE_MUTATION = gql`
  mutation UpdateExpense($updateExpenseInput: UpdateExpenseInput!) {
    updateExpense(UpdateExpenseInput: $updateExpenseInput) {
      ok
      expense {
        id
        name
        amount
        postedAt
        accountId
        categoryId
        merchantId
        merchantText
        memo
      }
      error
    }
  }
`;

export const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpense($deleteExpenseInput: DeleteExpenseInput!) {
    deleteExpense(DeleteExpenseInput: $deleteExpenseInput) {
      ok
      error
    }
  }
`;

export const FIND_EXPENSES_WITH_CATEGORIES_QUERY = gql`
  query FindExpensesWithCategories($findCategoryMonthlyExpenseInput: FindCategoryMonthlyExpenseInput!) {
    findCategoryMonthlyExpense(FindCategoryMonthlyExpenseInput: $findCategoryMonthlyExpenseInput) {
      ok
      error
      result {
        categoryId
        totalExpense
      }
    }
  }
`;

export const FIND_MONTHLY_EXPENSE_TOTAL_QUERY = gql`
  query FindMonthlyExpenseTotal($findMonthlyExpenseTotalInput: FindMonthlyExpenseTotalInput!) {
    findMonthlyExpenseTotal(FindMonthlyExpenseTotalInput: $findMonthlyExpenseTotalInput) {
      ok
      error
      months {
        month
        totalExpense
        totalCount
      }
    }
  }
`;

export const FIND_EXPENSES_QUERY = gql`
  query FindExpenses($findExpenseMonthlyInput: FindExpenseMonthlyInput!) {
    findExpenseMonthly(FindExpenseMonthlyInput: $findExpenseMonthlyInput) {
      expenses {
        id
        name
        amount
        postedAt
        accountId
        categoryId
        merchantId
        merchantText
        memo
      }
      totalCount
      ok
      error
    }
  }
`;

// BUDGETS
export const UPSERT_BUDGET_MUTATION = gql`
  mutation UpsertBudget($upsertBudgetInput: UpsertBudgetInput!) {
    upsertBudget(UpsertBudgetInput: $upsertBudgetInput) {
      ok
      error
      budget {
        id
        yearMonth
        totalAmount
      }
    }
  }
`;

export const DELETE_BUDGET_MUTATION = gql`
  mutation DeleteBudget($deleteBudgetInput: DeleteBudgetInput!) {
    deleteBudget(DeleteBudgetInput: $deleteBudgetInput) {
      ok
      error
    }
  }
`;

export const FIND_BUDGETS_QUERY = gql`
  query FindBudgets($findBudgetInput: FindBudgetInput!) {
    findBudgets(FindBudgetInput: $findBudgetInput) {
      ok
      error
      budgets {
        id
        yearMonth
        totalAmount
        category {
          id
          name
          sortOrder
        }
      }
    }
  }
`;
