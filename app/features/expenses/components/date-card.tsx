import { Card } from '~/common/components/ui/card';
import { Button } from '~/common/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '~/lib/utils';
import { DateTime } from 'luxon';

export function DateCard({ year, month }: { year: number; month: number }) {
  const thisYear = DateTime.now().year;
  const thisMonth = DateTime.now().month;
  const isThisMonth = year === thisYear && month === thisMonth;

  return (
    <Card className='flex items-center justify-between p-4 w-96 flex-row'>
      <Button variant='ghost' size='icon' className='cursor-pointer'>
        <Link to={`/expenses/${year}/${month - 1}`}>
          <ChevronLeft className='w-4 h-4' />
        </Link>
      </Button>
      <p className='text-lg font-semibold'>
        {year}년 {month}월
      </p>
      <Button variant='ghost' size='icon' className={cn('cursor-pointer', isThisMonth && 'invisible')} disabled={isThisMonth}>
        <Link to={`/expenses/${year}/${month + 1}`}>
          <ChevronRight className='w-4 h-4' />
        </Link>
      </Button>
    </Card>
  );
}
