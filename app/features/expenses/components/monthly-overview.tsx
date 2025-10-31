import { Separator } from "~/common/components/ui/separator";

export function MonthlyOverview({
  year,
  month,
  totalExpense,
  totalCount,
}: {
  year: number;
  month: number;
  totalExpense: number;
  totalCount: number;
}) {
  return (
    <div className="mt-5 rounded-lg p-4 w-2xl h-40 flex flex-col justify-center border-none bg-accent">
      <div className="space-y-1 flex flex-col justify-center pl-4">
        <h2 className="text-xl leading-none font-medium">Monthly Overview</h2>
        <p className="text-muted-foreground text-xs">
          Your spending at a glance for {year}년 {month}월
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center justify-center space-x-4 text-sm h-full">
        <div className="flex flex-col w-full justify-center items-center">
          <h4 className="text-xl font-semibold">{totalExpense.toLocaleString()}원</h4>
          <p className="text-muted-foreground text-xs">Total Spendt This Month</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col w-full justify-center items-center">
          <h4 className="text-xl font-semibold">{totalCount.toLocaleString()} 건</h4>
          <p className="text-muted-foreground text-xs">Total Expenses This Month</p>
        </div>
      </div>
    </div>
  );
}
