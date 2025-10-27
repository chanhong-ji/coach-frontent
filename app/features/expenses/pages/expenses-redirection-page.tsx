import { redirect } from 'react-router';
import { DateTime } from 'luxon';
import type { Route } from './+types/expenses-redirection-page';

export function loader({ request }: Route.LoaderArgs) {
  const today = DateTime.now();
  return redirect(`/expenses/${today.year}/${today.month}`);
}
