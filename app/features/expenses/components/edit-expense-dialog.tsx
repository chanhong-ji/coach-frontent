import { Form } from "react-router";
import { DialogFooter } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/common/components/ui/dialog";
import { InputPair } from "./input-pair";
import { SelectPair } from "./select-pair";
import type { AccountDto, CategoryDto, ExpenseDto } from "~/graphql/__generated__/graphql";
import { DateTime } from "luxon";

export function EditExpenseDialog({
  categories,
  accounts,
  expense,
}: {
  categories: CategoryDto[];
  accounts: AccountDto[];
  expense: ExpenseDto;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>지출 내역 수정</DialogTitle>
        <DialogDescription>지출 내역을 수정할 수 있습니다.</DialogDescription>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <input type="hidden" name="id" value={expense.id} />
        <InputPair name="name" label="지출 내역" maxLength={100} required defaultValue={expense.name} />
        <InputPair name="amount" label="금액" type="number" min={0} required defaultValue={expense.amount} />
        <InputPair
          name="date"
          label="날짜"
          type="date"
          required
          defaultValue={
            expense.postedAt ? DateTime.fromISO(expense.postedAt as string).toFormat("yyyy-MM-dd") : undefined
          }
        />
        <SelectPair
          name="accountId"
          label="결제 방식"
          options={accounts.map((account) => ({ value: account.id.toString(), label: account.name }))}
          placeholder="결제 방식을 선택해주세요."
          required
          defaultValue={accounts.find((account) => account.id === expense.accountId)?.id.toString() ?? undefined}
        />
        <SelectPair
          name="categoryId"
          label="카테고리"
          placeholder="카테고리를 선택해주세요."
          options={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
          defaultValue={categories.find((category) => category.id === expense.categoryId)?.id.toString() ?? undefined}
        />
        <InputPair name="memo" label="메모" type="textarea" defaultValue={expense.memo ?? undefined} />
        <DialogFooter>
          <Button className="hover:cursor-pointer" type="submit">
            수정
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
