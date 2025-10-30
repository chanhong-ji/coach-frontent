import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import AddBudgetDialog from "./add-budget-dialog";
import EditBudgetDialog from "./edit-budget-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "~/common/components/ui/alert-dialog";

type BudgetRow = {
  id: number;
  category: string;
  allocated: number; // 예산
  spent: number; // 사용액
};

type Props = {
  title?: string;
  items?: BudgetRow[];
  className?: string;
};

// 더미 데이터
const fallbackItems: BudgetRow[] = [
  { id: 1, category: "Groceries", allocated: 500, spent: 350 },
  { id: 2, category: "Entertainment", allocated: 200, spent: 180 },
  { id: 3, category: "Utilities", allocated: 150, spent: 100 },
  { id: 4, category: "Savings", allocated: 1000, spent: 400 },
  { id: 5, category: "Health", allocated: 300, spent: 200 },
];

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "KRW" });
}

function ProgressBar({ pct }: { pct: number }) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <div className="space-y-1">
      <div className="h-2 w-full rounded-full bg-muted relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full bg-primary rounded-full" style={{ width: `${value}%` }} />
        <div className="absolute right-0 top-0 h-full bg-primary/10" style={{ width: `${100 - value}%` }} />
      </div>
      <div className="text-xs text-muted-foreground tabular-nums">{value}%</div>
    </div>
  );
}

export default function BudgetTableCard({ title = "Budgets", items = fallbackItems, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add Budget
            </Button>
          </DialogTrigger>
          <AddBudgetDialog />
        </Dialog>
      </CardHeader>

      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[34%]">Category</TableHead>
              <TableHead className="w-[18%]">Allocated</TableHead>
              <TableHead className="w-[18%]">Spent</TableHead>
              <TableHead className="w-[22%]">Progress</TableHead>
              <TableHead className="w-[8%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((row) => {
              const pct = row.allocated > 0 ? Math.round((row.spent / row.allocated) * 100) : 0;
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell className="tabular-nums">{currency(row.allocated)}</TableCell>
                  <TableCell className="tabular-nums">{currency(row.spent)}</TableCell>
                  <TableCell className="pr-8">
                    <ProgressBar pct={pct} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8" aria-label={`Edit ${row.category}`}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <EditBudgetDialog />
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Delete ${row.category}`}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{`${row.category} 예산 삭제`}</AlertDialogTitle>
                            <AlertDialogDescription>해당 카테고리의 예산을 삭제할까요?</AlertDialogDescription>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
                              <Button type="submit" variant="destructive" className="hover:cursor-pointer">
                                삭제
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogHeader>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
