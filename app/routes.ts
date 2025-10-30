import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
  route("/dashboard", "features/dashboard/pages/dashboard-page.tsx"), //
  ...prefix("/expenses", [
    index("features/expenses/pages/expenses-redirection-page.tsx"), //
    route("/:year/:month", "features/expenses/pages/expenses-page.tsx"),
  ]),
  route("/login", "features/auth/pages/login-page.tsx"),
  route("/join", "features/auth/pages/join-page.tsx"),
  route("/logout", "features/auth/pages/logout-page.tsx"),
  route("/settings", "features/settings/pages/settings-page.tsx"),
] satisfies RouteConfig;
