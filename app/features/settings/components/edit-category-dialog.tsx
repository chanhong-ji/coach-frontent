import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";
import { InputPair } from "~/features/expenses/components/input-pair";

export function EditCategoryDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>카테고리 수정</DialogTitle>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <InputPair name="name" label="타이틀" required placeholder="New category name" />
        <DialogFooter>
          <Button type="submit">Edit Category</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
