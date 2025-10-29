import { Form } from "react-router";
import { Dialog, DialogFooter, DialogTrigger } from "~/common/components/ui/dialog";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/common/components/ui/dialog";
import { InputPair } from "./input-pair";
import { SelectPair } from "./select-pair";

export function EditExpenseDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogDescription>Edit the expense details.</DialogDescription>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <InputPair name="title" label="지출 내역" maxLength={100} required />
        <InputPair name="amount" label="금액" type="number" min={0} required />
        <InputPair name="date" label="날짜" type="date" required />
        <SelectPair
          name="account"
          label="결제 방식"
          options={[
            { value: "Cash", label: "Cash" },
            { value: "Credit Card", label: "Credit Card" },
            { value: "Debit Card", label: "Debit Card" },
            { value: "Other", label: "Other" },
          ]}
          defaultValue="Cash"
          placeholder="결제 방식을 선택해주세요."
          required
        />
        <SelectPair
          name="category"
          label="카테고리"
          placeholder="카테고리를 선택해주세요."
          options={[
            { value: "Food", label: "Food" },
            { value: "Transportation", label: "Transportation" },
            { value: "Entertainment", label: "Entertainment" },
            { value: "Other", label: "Other" },
          ]}
        />
        <InputPair name="memo" label="메모" type="textarea" />
      </Form>
      <DialogFooter>
        <Button type="submit">Edit Expense</Button>
      </DialogFooter>
    </DialogContent>
  );
}
