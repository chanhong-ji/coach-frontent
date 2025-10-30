import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/common/components/ui/table";
import { Badge } from "~/common/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import EditAccountDialog from "./edit-account-dialog";
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
import AddAccountDialog from "./add-acount-dialog";

type AccountType = "credit" | "debit" | "bank" | "paypal" | "gpay";

type PaymentMethod = {
  id: number;
  type: AccountType;
  name: string;
  details: string;
  isActive: boolean;
};

type Props = {
  title?: string;
  items?: PaymentMethod[];
  className?: string;
};

// 더미 데이터
const fallbackItems: PaymentMethod[] = [
  { id: 1, type: "credit", name: "Credit Card", details: "**** 1234", isActive: true },
  { id: 2, type: "debit", name: "Debit Card", details: "**** 5678", isActive: true },
  { id: 3, type: "bank", name: "Bank Account", details: "Acme Bank", isActive: true },
  { id: 4, type: "paypal", name: "PayPal", details: "user@example.com", isActive: true },
  { id: 5, type: "gpay", name: "Google Pay", details: "user@gmail.com", isActive: true },
];

export default function AccountCard({ title = "Accounts", items = fallbackItems, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add Account
            </Button>
          </DialogTrigger>
          <AddAccountDialog />
        </Dialog>
      </CardHeader>

      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[35%]">Type</TableHead>
              <TableHead className="w-[35%]">Details</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap">{m.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">{m.details}</TableCell>

                <TableCell>
                  {m.isActive ? (
                    <Badge variant="secondary" className="rounded-full">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="rounded-full">
                      Inactive
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <EditAccountDialog />
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>해당 결제 수단을 삭제할까요?</AlertDialogTitle>
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
