import type { Route } from './+types/expenses-page';
import { z } from 'zod';
import { DateTime } from 'luxon';
import { DateCard } from '../components/date-card';
import { MonthlyOverview } from '../components/monthly-overview';

const paramSchema = z.object({
  year: z.coerce.number(),
  month: z.coerce.number(),
});

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { success, data: parsedParams } = paramSchema.safeParse(params);
  if (!success) {
    throw new Error('Invalid parameters');
  }
  const { year, month } = parsedParams;
  const thisYear = DateTime.now().year;
  const thisMonth = DateTime.now().month;
  const isFuture = thisYear > year || (thisYear === year && month > thisMonth);
  if (isFuture) {
    throw new Error('Future month');
  }
  return { year, month };
};

export default function ExpensesPage({ loaderData }: Route.ComponentProps) {
  const { year, month } = loaderData;

  return (
    <div className='flex flex-col items-center justify-center'>
      <DateCard year={year} month={month} />
      <MonthlyOverview year={year} month={month} />
    </div>
  );
}
