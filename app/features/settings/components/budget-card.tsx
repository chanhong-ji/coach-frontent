import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import { Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import AddBudgetDialog from "./add-budget-dialog";
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
import type { BudgetDto, CategoryDto } from "~/graphql/__generated__/graphql";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { currency } from "../utils/util";

type Props = {
  title?: string;
  budgets?: BudgetDto[];
  className?: string;
  categories?: CategoryDto[];
  year: number;
  month: number;
};

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

export default function BudgetTableCard({ budgets, categories, year, month, className }: Props) {
  const fetcher = useFetcher();
  const [addBudgetOpen, setAddBudgetOpen] = useState(false);
  const [deleteBudgetOpen, setDeleteBudgetOpen] = useState(false);
  const [deleteBudget, setDeleteBudget] = useState<BudgetDto | null>(null);

  const handleAddBudgetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddBudgetOpen(true);
  };

  const handleDeleteBudgetClick = (e: React.MouseEvent<HTMLButtonElement>, budget: BudgetDto) => {
    e.preventDefault();
    setDeleteBudget(budget);
    setDeleteBudgetOpen(true);
  };

  const handleDeleteBudget = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!deleteBudget) return;
    fetcher.submit(
      {
        intent: "delete-budget",
        budgetId: String(deleteBudget.id),
      },
      {
        method: "post",
        action: "/settings/api/delete-budget",
      },
    );
  };

  useEffect(() => {
    if (fetcher.data?.ok) {
      setDeleteBudgetOpen(false);
    }
  }, [fetcher.data]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Budgets</CardTitle>
        <Dialog open={addBudgetOpen} onOpenChange={setAddBudgetOpen}>
          <DialogTrigger asChild onClick={handleAddBudgetClick}>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add & Edit Budget
            </Button>
          </DialogTrigger>
          <AddBudgetDialog categories={categories ?? []} year={year} month={month} setOpen={setAddBudgetOpen} />
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
            <AlertDialog open={deleteBudgetOpen} onOpenChange={setDeleteBudgetOpen}>
              {budgets?.map((budget) => {
                const pct =
                  budget.totalAmount > 0
                    ? Math.round(((budget.category?.totalExpense ?? 0) / budget.totalAmount) * 100)
                    : 0;
                return (
                  <TableRow key={budget.id}>
                    <TableCell className="font-medium">{budget.category?.name ?? "Total"}</TableCell>
                    <TableCell className="tabular-nums">{currency(budget.totalAmount)}</TableCell>
                    {/* spent amount */}
                    <TableCell className="tabular-nums">{currency(budget.category?.totalExpense ?? 0)}</TableCell>
                    <TableCell className="pr-8">
                      <ProgressBar pct={pct} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <AlertDialogTrigger asChild onClick={(e) => handleDeleteBudgetClick(e, budget)}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={`Delete ${budget.category?.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{`${deleteBudget?.category?.name ?? "Total"} 예산 삭제`}</AlertDialogTitle>
                  <AlertDialogDescription>해당 카테고리의 예산을 삭제할까요?</AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
                    <Button
                      type="submit"
                      variant="destructive"
                      className="hover:cursor-pointer"
                      onClick={handleDeleteBudget}
                    >
                      삭제
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogHeader>
              </AlertDialogContent>
            </AlertDialog>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
