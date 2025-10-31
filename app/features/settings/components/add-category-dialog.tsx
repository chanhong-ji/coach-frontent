import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";
import { InputPair } from "~/features/expenses/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { useFetcher } from "react-router";
import { useEffect } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function AddCategoryDialog({ setOpen }: { setOpen: (open: boolean) => void }) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.ok) {
      setOpen(false);
    }
  }, [fetcher.data]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>카테고리 추가</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <fetcher.Form method="post" action="/settings/api/add-category" className="space-y-4">
        <InputPair name="name" label="타이틀" required placeholder="New category name" />
        <DialogFooter>
          <Button type="submit">Add Category</Button>
        </DialogFooter>
      </fetcher.Form>
      {fetcher.data?.error && <p className="text-red-500">{fetcher.data.error}</p>}
    </DialogContent>
  );
}
