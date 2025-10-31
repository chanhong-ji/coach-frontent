import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/common/components/ui/dialog";
import { Form, useFetcher } from "react-router";
import { InputPair } from "./input-pair";
import { SelectPair } from "./select-pair";
import { Button } from "~/common/components/ui/button";
import type { AccountDto, CategoryDto } from "~/graphql/__generated__/graphql";
import { DateTime } from "luxon";
import { useEffect } from "react";

export function AddExpenseDialog({
  categories,
  accounts,
  setOpen,
}: {
  categories: CategoryDto[];
  accounts: AccountDto[];
  setOpen: (open: boolean) => void;
}) {
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.data?.ok) {
      setOpen(false);
    }
  }, [fetcher.data]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>지출 내역 추가</DialogTitle>
        <DialogDescription>Add a new expense to your budget.</DialogDescription>
      </DialogHeader>
      <fetcher.Form method="post" action="/expenses/api/add-expense" className="space-y-4">
        <InputPair name="name" label="지출 내역" maxLength={100} required />
        <InputPair name="amount" label="금액" type="number" min={0} required />
        <InputPair name="date" label="날짜" type="date" required defaultValue={DateTime.now().toFormat("yyyy-MM-dd")} />
        <SelectPair
          name="accountId"
          label="결제 방식"
          options={accounts.map((account) => ({ value: account.id.toString(), label: account.name }))}
          placeholder="결제 방식을 선택해주세요."
          required
        />
        <SelectPair
          name="categoryId"
          label="카테고리"
          placeholder="카테고리를 선택해주세요."
          options={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
          required
        />
        <InputPair name="memo" label="메모" type="textarea" />
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </fetcher.Form>
    </DialogContent>
  );
}
