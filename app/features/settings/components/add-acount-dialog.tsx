import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Form } from "react-router";
import { InputPair } from "~/features/expenses/components/input-pair";
import { SelectPair } from "~/features/expenses/components/select-pair";
import { Button } from "~/common/components/ui/button";

const accountTypes = [
  { value: "credit", label: "Credit Card" },
  { value: "debit", label: "Debit Card" },
  { value: "bank", label: "Bank Account" },
  { value: "paypal", label: "PayPal" },
  { value: "gpay", label: "Google Pay" },
];

export default function AddAccountDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>결제 수단 추가</DialogTitle>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <InputPair name="name" label="이름" required placeholder="결제 수단 이름을 입력해주세요." />
        <InputPair name="details" label="설명" required placeholder="결제 수단 설명을 입력해주세요." />
        <SelectPair name="type" label="유형" options={accountTypes} required />
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
