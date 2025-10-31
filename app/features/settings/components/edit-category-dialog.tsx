import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";
import { InputPair } from "~/features/expenses/components/input-pair";
import type { CategoryDto } from "~/graphql/__generated__/graphql";

export function EditCategoryDialog({ category, setOpen }: { category: CategoryDto; setOpen: (open: boolean) => void }) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data?.ok) {
      setOpen(false);
    }
  }, [fetcher.data]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>카테고리 수정</DialogTitle>
      </DialogHeader>
      <DialogDescription></DialogDescription>
      <fetcher.Form method="post" action="/settings/api/update-category" className="space-y-4">
        <input type="hidden" name="id" value={category.id} />
        <InputPair name="name" label="타이틀" required placeholder="New category name" defaultValue={category.name} />
        <DialogFooter>
          <Button type="submit">Edit Category</Button>
        </DialogFooter>
      </fetcher.Form>
      {fetcher.data?.error && <p className="text-red-500">{fetcher.data.error}</p>}
    </DialogContent>
  );
}
