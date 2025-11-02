import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "~/common/components/ui/item";
import { Badge } from "~/common/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { Button } from "~/common/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Dialog } from "~/common/components/ui/dialog";
import { EditExpenseDialog } from "./edit-expense-dialog";
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
import { Form, useActionData, useFetcher } from "react-router";
import type { AccountDto, CategoryDto, ExpenseDto } from "~/graphql/__generated__/graphql";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import type { action } from "../pages/expenses-page";

export function ExpenseList({
  expenses,
  categories,
  accounts,
}: {
  expenses: ExpenseDto[];
  categories: CategoryDto[];
  accounts: AccountDto[];
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editExpense, setEditExpense] = useState<ExpenseDto | null>(null);
  const actionData = useActionData<typeof action>();
  const fetcher = useFetcher();

  const handleEditExpense = (expense: ExpenseDto) => {
    setEditExpense(expense);
    setEditOpen(true);
  };

  const handleDeleteExpense = (e: React.MouseEvent<HTMLDivElement>, expense: ExpenseDto) => {
    e.preventDefault();
    fetcher.submit(
      {
        intent: "delete-expense",
        expenseId: String(expense.id),
      },
      {
        method: "post",
        action: "/expenses/api/delete-expense",
      },
    );
  };

  useEffect(() => {
    if (actionData?.ok) {
      setEditOpen(false);
    }
  }, [actionData]);

  useEffect(() => {
    if (fetcher.data?.ok) {
      setDeleteOpen(false);
    }
  }, [fetcher.data]);

  return (
    <div className="w-2xl space-y-4 border-2 border-accent-foreground/2 mt-3">
      {expenses.length === 0 && (
        <div className="text-center text-sm text-muted-foreground">
          이번달의 지출 내역이 없습니다. 지출 내역을 추가해주세요.
        </div>
      )}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        {expenses.map((expense, index) => (
          <Item key={index} variant="outline">
            <ItemContent>
              <ItemDescription>{DateTime.fromISO(expense.postedAt as string).toFormat("yyyy-MM-dd")}</ItemDescription>
              <ItemTitle className="">{expense.name}</ItemTitle>
              <ItemDescription className="text-xs">{expense.memo}</ItemDescription>
              <div className="flex w-full flex-wrap gap-2">
                <Badge variant="secondary">
                  {categories.find((category) => category.id === expense.categoryId)?.name ?? "Unknown"}
                </Badge>
                <Badge variant="secondary">
                  {accounts.find((account) => account.id === expense.accountId)?.name ?? "Unknown"}
                </Badge>
              </div>
            </ItemContent>
            <ItemContent>
              <ItemTitle>{expense.amount.toLocaleString()} 원</ItemTitle>
            </ItemContent>
            <ItemActions>
              <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 hover:cursor-pointer">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="hover:cursor-pointer" onClick={() => handleEditExpense(expense)}>
                      Edit
                    </DropdownMenuItem>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={(e) => handleDeleteExpense(e, expense)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>해당 지출을 삭제할까요?</AlertDialogTitle>
                    <AlertDialogDescription>
                      이 작업은 되돌릴 수 없습니다. 삭제를 진행하시겠습니까?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
                    <Form method="post" className="inline-flex hover:cursor-pointer">
                      <input type="hidden" name="intent" value="delete-expense" />
                      <input type="hidden" name="expenseId" value={String(index)} />
                      <Button type="submit" variant="destructive" className="hover:cursor-pointer">
                        삭제
                      </Button>
                    </Form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ItemActions>
          </Item>
        ))}
        {editExpense && <EditExpenseDialog categories={categories} accounts={accounts} expense={editExpense} />}
      </Dialog>
    </div>
  );
}
