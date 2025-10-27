import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/dashboard', 'features/dashboard/pages/dashboard-page.tsx'), //
  route('/expenses', 'features/expenses/pages/expenses-page.tsx'),
] satisfies RouteConfig;
