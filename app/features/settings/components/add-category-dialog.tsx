import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";
import { Form } from "react-router";
import { InputPair } from "~/features/expenses/components/input-pair";
import { Button } from "~/common/components/ui/button";

export default function AddCategoryDialog() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>카테고리 추가</DialogTitle>
      </DialogHeader>
      <Form method="post" className="space-y-4">
        <InputPair name="name" label="타이틀" required placeholder="New category name" />
        <DialogFooter>
          <Button type="submit">Add Category</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
