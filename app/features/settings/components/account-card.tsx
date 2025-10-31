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
import { AccountType, type AccountDto } from "~/graphql/__generated__/graphql";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

type Props = {
  title?: string;
  accounts?: AccountDto[];
  className?: string;
};

export default function AccountCard({ title = "Accounts", accounts, className }: Props) {
  const fetcher = useFetcher();
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState<AccountDto | null>(null);

  const handleAddAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAddAccountOpen(true);
  };

  const handleDeleteAccountClick = (e: React.MouseEvent<HTMLButtonElement>, account: AccountDto) => {
    e.preventDefault();
    setDeleteAccount(account);
    setDeleteAccountOpen(true);
  };

  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!deleteAccount) return;
    fetcher.submit(
      {
        intent: "delete-account",
        accountId: String(deleteAccount.id),
      },
      {
        method: "post",
        action: "/settings/api/delete-account",
      },
    );
  };

  useEffect(() => {
    if (fetcher.data?.ok) {
      setDeleteAccountOpen(false);
    }
  }, [fetcher.data]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
          <DialogTrigger asChild onClick={handleAddAccountClick}>
            <Button size="sm" variant="link" className="hover:cursor-pointer">
              Add Account
            </Button>
          </DialogTrigger>
          <AddAccountDialog
            accountTypes={Object.values(AccountType).map((type) => type.toString())}
            setOpen={setAddAccountOpen}
          />
        </Dialog>
      </CardHeader>

      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-[35%]">Name</TableHead>
              <TableHead className="w-[35%]">Type</TableHead>
              <TableHead className="w-[20%]">Status</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {accounts?.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap">{account.name}</span>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">{account.type}</TableCell>

                <TableCell>
                  {account.isActive ? (
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
