import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "~/common/components/ui/item";
import { Badge } from "~/common/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { Button } from "~/common/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export function ExpenseList() {
  return (
    <div className="w-3xl space-y-4 border-2 border-accent-foreground/2">
      {Array.from({ length: 10 }).map((_, index) => (
        <Item variant="outline">
          <ItemContent>
            <ItemDescription>Tuesday, 27th October 2025</ItemDescription>
            <ItemTitle>Movie Tickets with friends</ItemTitle>
            <div className="flex w-full flex-wrap gap-2">
              <Badge variant="secondary">Food</Badge>
            </div>
          </ItemContent>
          <ItemContent>
            <ItemTitle>100000 KRW</ItemTitle>
          </ItemContent>
          <ItemActions>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
