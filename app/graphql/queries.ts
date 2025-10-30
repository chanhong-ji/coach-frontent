import { gql } from "graphql-request";

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

export const CREATE_ACCOUNT_MUTATION = gql`
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
