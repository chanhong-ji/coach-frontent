import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { Form, useFetcher } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Checkbox } from "~/common/components/ui/checkbox";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import { InputPair } from "~/features/expenses/components/input-pair";
import { SelectPair } from "~/features/expenses/components/select-pair";
import { AccountType, type AccountDto } from "~/graphql/__generated__/graphql";

export default function EditAccountDialog({
  account,
  setOpen,
}: {
  account: AccountDto;
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
        <DialogTitle>결제 수단 수정</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <fetcher.Form method="post" action="/settings/api/update-account" className="space-y-4">
        <input type="hidden" name="id" value={account.id} />
        <InputPair name="name" label="Name" required placeholder="New account name" defaultValue={account.name} />
        <InputPair name="details" label="Details" placeholder="New account details" defaultValue={""} />
        <SelectPair
          name="type"
          label="Type"
          options={Object.values(AccountType).map((type) => ({ value: type.toString(), label: type.toString() }))}
          required
          defaultValue={account.type.toString()}
        />
        <SelectPair
          name="status"
          label="Status"
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          defaultValue={account.isActive ? "active" : "inactive"}
          required
        />
        <DialogFooter>
          <Button className="hover:cursor-pointer" type="submit">
            수정
          </Button>
        </DialogFooter>
      </fetcher.Form>
      {fetcher.data?.error && <p className="text-red-500">{fetcher.data.error}</p>}
    </DialogContent>
  );
}
