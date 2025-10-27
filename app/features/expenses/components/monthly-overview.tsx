import { Separator } from '~/common/components/ui/separator';

export function MonthlyOverview({ year, month }: { year: number; month: number }) {
  return (
    <div className='mt-10 border-accent-foreground/3 border-2 rounded-lg p-4 w-3/4 min-w-96'>
      <div className='space-y-1'>
        <h2 className='text-xl leading-none font-medium'>Monthly Overview</h2>
        <p className='text-muted-foreground text-xs'>
          Your spending at a glance for {year}년 {month}월
        </p>
      </div>
      <Separator className='my-4' />
      <div className='flex h-10 items-center space-x-4 text-sm'>
        <div className='flex flex-col w-full justify-center items-center'>
          <h4 className='text-xl font-bold'>99,999원</h4>
          <p className='text-muted-foreground text-xs'>Total Spendt This Month</p>
        </div>
        <Separator orientation='vertical' />
        <div className='flex flex-col w-full justify-center items-center'>
          <h4 className='text-xl font-bold'>23 건</h4>
          <p className='text-muted-foreground text-xs'>Total Expenses This Month</p>
        </div>
      </div>
    </div>
  );
}
