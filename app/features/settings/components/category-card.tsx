import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import { EditCategoryDialog } from "./edit-category-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "~/common/components/ui/alert-dialog";
import AddCategoryDialog from "./add-category-dialog";

type CategoryRow = {
  id: number;
  name: string;
  icon: "groceries" | "rent" | "dining" | "transport" | "education";
  usageCount: number;
};

type Props = {
  title?: string;
  items?: CategoryRow[];
  className?: string;
};

// fake data (fallback)
const fallbackItems: CategoryRow[] = [
  { id: 1, name: "Groceries", icon: "groceries", usageCount: 12 },
  { id: 2, name: "Rent/Mortgage", icon: "rent", usageCount: 1 },
  { id: 3, name: "Dining Out", icon: "dining", usageCount: 5 },
  { id: 4, name: "Transportation", icon: "transport", usageCount: 8 },
  { id: 5, name: "Education", icon: "education", usageCount: 2 },
];

function pluralize(n: number, unit: string) {
  return `${n} ${unit}${n === 1 ? "" : "s"}`;
}

export default function CategoryCard({ title = "Categories", items = fallbackItems, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add Category
            </Button>
          </DialogTrigger>
          <AddCategoryDialog />
        </Dialog>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Category</TableHead>
              <TableHead className="w-[35%]">Usage</TableHead>
              <TableHead className="w-[15%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span>{c.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">{pluralize(c.usageCount, "transaction")}</TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" aria-label={`Edit ${c.name}`}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <EditCategoryDialog />
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Delete ${c.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>해당 카테고리를 삭제할까요?</AlertDialogTitle>
                          <AlertDialogDescription>
                            이 작업은 되돌릴 수 없습니다. 삭제를 진행하시겠습니까?
                          </AlertDialogDescription>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
                            <Button type="submit" variant="destructive" className="hover:cursor-pointer">
                              삭제
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogHeader>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
