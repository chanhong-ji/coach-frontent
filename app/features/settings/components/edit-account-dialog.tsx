import { Form } from "react-router";
import { Checkbox } from "~/common/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import { InputPair } from "~/features/expenses/components/input-pair";
import { SelectPair } from "~/features/expenses/components/select-pair";

export default function EditAccountDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Account</DialogTitle>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <InputPair name="name" label="Name" required placeholder="New account name" />
        <InputPair name="details" label="Details" required placeholder="New account details" />
        <SelectPair
          name="type"
          label="Type"
          options={[
            { value: "credit", label: "Credit Card" },
            { value: "debit", label: "Debit Card" },
            { value: "bank", label: "Bank Account" },
            { value: "paypal", label: "PayPal" },
            { value: "gpay", label: "Google Pay" },
          ]}
          required
        />
        <SelectPair
          name="status"
          label="Status"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          required
        />
        <div className="flex items-start gap-3">
          <Checkbox id="active" defaultChecked />
          <div className="grid gap-2">
            <Label htmlFor="active">Active</Label>
            <p className="text-muted-foreground text-xs">
              By clicking this checkbox, you agree to the terms and conditions.
            </p>
          </div>
        </div>
      </Form>
    </DialogContent>
  );
}
