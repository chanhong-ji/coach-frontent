import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Form, useFetcher } from "react-router";
import { InputPair } from "~/features/expenses/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { SelectPair } from "~/features/expenses/components/select-pair";
import type { CategoryDto } from "~/graphql/__generated__/graphql";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";

export default function AddBudgetDialog({
  categories,
  year,
  month,
  setOpen,
}: {
  categories: CategoryDto[];
  year: number;
  month: number;
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
        <DialogTitle>예산 추가</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <fetcher.Form method="post" action="/settings/api/add-budget" className="space-y-4">
        <input type="hidden" name="year" value={year} />
        <input type="hidden" name="month" value={month} />
        <SelectPair
          name="categoryId"
          label="카테고리"
          placeholder="카테고리를 선택해주세요."
          options={categories.map((category) => ({ value: category.id.toString(), label: category.name }))}
          required
        />
        <InputPair
          name="allocated"
          label="예산 금액"
          type="number"
          min={0}
          required
          placeholder="예산 금액을 입력해주세요."
        />
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </fetcher.Form>
    </DialogContent>
  );
}
