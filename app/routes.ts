import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
  route('/dashboard', 'features/dashboard/pages/dashboard-page.tsx'), //
  ...prefix('/expenses', [
    index('features/expenses/pages/expenses-redirection-page.tsx'), //
    route('/:year/:month', 'features/expenses/pages/expenses-page.tsx'),
  ]),
] satisfies RouteConfig;
