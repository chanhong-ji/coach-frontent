import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { useFetcher } from "react-router";
import { InputPair } from "~/features/expenses/components/input-pair";
import { SelectPair } from "~/features/expenses/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { useEffect } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddAccountDialog({
  accountTypes,
  setOpen,
}: {
  accountTypes: string[];
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
        <DialogTitle>결제 수단 추가</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <fetcher.Form method="post" action="/settings/api/add-account" className="space-y-4">
        <InputPair name="name" label="이름" required placeholder="결제 수단 이름을 입력해주세요." />
        <InputPair name="details" label="설명" required placeholder="결제 수단 설명을 입력해주세요." />
        <SelectPair
          name="type"
          label="유형"
          options={accountTypes.map((type) => ({ value: type, label: type }))}
          required
        />
        <DialogFooter>
          <Button type="submit">추가</Button>
        </DialogFooter>
      </fetcher.Form>
    </DialogContent>
  );
}
