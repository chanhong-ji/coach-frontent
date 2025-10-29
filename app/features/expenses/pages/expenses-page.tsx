import type { Route } from './+types/expenses-page';
import { z } from 'zod';
import { DateTime } from 'luxon';
import { DateCard } from '../components/date-card';
import { MonthlyOverview } from '../components/monthly-overview';
import { Item, ItemGroup, ItemHeader, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions, ItemFooter } from '~/common/components/ui/item';
import { Button } from '~/common/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/common/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Badge } from '~/common/components/ui/badge';

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
      <ItemGroup className='w-3xl mt-10 space-y-4 border-2 border-accent-foreground/2'>
        <Item variant='outline'>
          <ItemContent>
            <ItemDescription>Tuesday, 27th October 2025</ItemDescription>
            <ItemTitle>Movie Tickets with friends</ItemTitle>
            <div className='flex w-full flex-wrap gap-2'>
              <Badge variant='secondary'>Food</Badge>
            </div>
          </ItemContent>
          <ItemContent>
            <ItemTitle>100000 KRW</ItemTitle>
          </ItemContent>
          <ItemActions>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreHorizontal className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}
