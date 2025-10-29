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
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
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
import { Form } from "react-router";

export function ExpenseList() {
  return (
    <div className="w-3xl space-y-4 border-2 border-accent-foreground/2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Item key={index} variant="outline">
          <ItemContent>
            <ItemDescription>Tuesday, 27th October 2025</ItemDescription>
            <ItemTitle>Movie Tickets with friends</ItemTitle>
            <div className="flex w-full flex-wrap gap-2">
              <Badge variant="secondary">Food</Badge>
            </div>
          </ItemContent>
          <ItemContent>
            <ItemTitle>100000 KRW</ItemTitle>
          </ItemContent>
          <ItemActions>
            <AlertDialog>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DialogTrigger asChild>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DialogTrigger>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Delete</DropdownMenuItem>
                    </AlertDialogTrigger>
                  </DropdownMenuContent>
                </DropdownMenu>
                <EditExpenseDialog />
              </Dialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>해당 지출을 삭제할까요?</AlertDialogTitle>
                  <AlertDialogDescription>
                    이 작업은 되돌릴 수 없습니다. 삭제를 진행하시겠습니까?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>취소</AlertDialogCancel>
                  <Form method="post" className="inline-flex">
                    <input type="hidden" name="intent" value="delete-expense" />
                    <input type="hidden" name="expenseId" value={String(index)} />
                    <Button type="submit" variant="destructive">
                      삭제
                    </Button>
                  </Form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
