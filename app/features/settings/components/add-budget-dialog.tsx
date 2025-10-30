import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Form } from "react-router";
import { InputPair } from "~/features/expenses/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { SelectPair } from "~/features/expenses/components/select-pair";

export default function AddBudgetDialog() {
  const categories = [
    { value: "Food", label: "Food" },
    { value: "Transportation", label: "Transportation" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Other", label: "Other" },
  ];
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>예산 추가</DialogTitle>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <SelectPair name="category" label="Category" placeholder="Select a category" options={categories} required />
        <InputPair
          name="allocated"
          label="Allocated"
          type="number"
          min={0}
          required
          placeholder="New allocated amount"
        />
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
