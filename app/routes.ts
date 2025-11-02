import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  route("/dashboard", "features/dashboard/pages/dashboard-page.tsx"), //
  ...prefix("/expenses", [
    index("features/expenses/pages/expenses-redirection-page.tsx"), //
    route("/:year/:month", "features/expenses/pages/expenses-page.tsx"),
    route("/api/add-expense", "features/expenses/api/add-expense-api.tsx"),
    route("/api/delete-expense", "features/expenses/api/delete-expense-api.tsx"),
  ]),
  ...prefix("/settings", [
    index("features/settings/pages/settings-page.tsx"),
    route("/api/add-category", "features/settings/api/add-category-api.tsx"),
    route("/api/update-category", "features/settings/api/update-category-api.tsx"),
    route("/api/delete-category", "features/settings/api/delete-category-api.tsx"),
    route("/api/add-budget", "features/settings/api/add-budget-api.tsx"),
    route("/api/delete-budget", "features/settings/api/delete-budget-api.tsx"),
    route("/api/add-account", "features/settings/api/add-account-api.tsx"),
    route("/api/update-account", "features/settings/api/update-account-api.tsx"),
    route("/api/delete-account", "features/settings/api/delete-account-api.tsx"),
  ]),
  route("/login", "features/auth/pages/login-page.tsx"),
  route("/join", "features/auth/pages/join-page.tsx"),
  route("/logout", "features/auth/pages/logout-page.tsx"),
] satisfies RouteConfig;
