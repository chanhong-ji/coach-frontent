import { Separator } from "~/common/components/ui/separator";

export function MonthlyOverview({ year, month }: { year: number; month: number }) {
  return (
    <div className="mt-10 rounded-lg p-4 w-2xl h-40 flex flex-col justify-center border-none bg-accent">
      <div className="space-y-1 flex flex-col justify-center pl-4">
        <h2 className="text-xl leading-none font-medium">Monthly Overview</h2>
        <p className="text-muted-foreground text-xs">
          Your spending at a glance for {year}년 {month}월
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-center space-x-4 text-sm h-full">
        <div className="flex flex-col w-full justify-center items-center">
          <h4 className="text-xl font-semibold">99,999원</h4>
          <p className="text-muted-foreground text-xs">Total Spendt This Month</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col w-full justify-center items-center">
          <h4 className="text-xl font-semibold">23 건</h4>
          <p className="text-muted-foreground text-xs">Total Expenses This Month</p>
        </div>
      </div>
    </div>
  );
}
