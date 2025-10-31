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
import { useEffect, useState } from "react";
import type { CategoryDto } from "~/graphql/__generated__/graphql";
import { useFetcher } from "react-router";

type Props = {
  title?: string;
  categories?: CategoryDto[];
  className?: string;
};

function pluralize(n: number, unit: string) {
  return `${n} ${unit}${n === 1 ? "" : "s"}`;
}

export default function CategoryCard({ title = "Categories", categories, className }: Props) {
  const fetcher = useFetcher();
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryDto | null>(null);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState<CategoryDto | null>(null);

  const handleEditCategory = (e: React.MouseEvent<HTMLButtonElement>, category: CategoryDto) => {
    e.preventDefault();
    setEditCategory(category);
    setEditCategoryOpen(true);
  };

  const handleDeleteCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!deleteCategory) return;
    fetcher.submit(
      {
        intent: "delete-category",
        categoryId: String(deleteCategory.id),
      },
      {
        method: "post",
        action: "/settings/api/delete-category",
      },
    );
  };

  useEffect(() => {
    if (fetcher.data?.ok) {
      setDeleteCategoryOpen(false);
    }
  }, [fetcher.data]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add Category
            </Button>
          </DialogTrigger>
          <AddCategoryDialog setOpen={setAddCategoryOpen} />
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
            <Dialog open={editCategoryOpen} onOpenChange={setEditCategoryOpen}>
              <AlertDialog open={deleteCategoryOpen} onOpenChange={setDeleteCategoryOpen}>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span>{category.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">{pluralize(100, "transaction")}</TableCell>

                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-2">
                        <DialogTrigger asChild onClick={(e) => handleEditCategory(e, category)}>
                          <Button variant="outline" size="icon" className="h-8 w-8 hover:cursor-pointer">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>

                        <AlertDialogTrigger asChild onClick={() => setDeleteCategory(category)}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            aria-label={`Delete ${category.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>

                        {fetcher.data?.error && <p className="text-red-500">{fetcher.data.error}</p>}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {editCategory && <EditCategoryDialog category={editCategory} setOpen={setEditCategoryOpen} />}
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>해당 카테고리를 삭제할까요?</AlertDialogTitle>
                    <AlertDialogDescription>
                      이 작업은 되돌릴 수 없습니다. 삭제를 진행하시겠습니까?
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="hover:cursor-pointer">취소</AlertDialogCancel>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="hover:cursor-pointer"
                        onClick={handleDeleteCategory}
                      >
                        삭제
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogHeader>
                </AlertDialogContent>
              </AlertDialog>
            </Dialog>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
