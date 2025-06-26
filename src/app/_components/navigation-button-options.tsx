"use client";

import {
  EllipsisVertical,
  Flag,
  PenLine,
  Clipboard,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Duplicate } from "@/assets/duplicate";
import { useNavigationStore } from "@/store";
import { RenameDialog } from "@/components/dialogs/rename-dialog";
import { Item } from "@/store";
import { DeleteConfirmation } from "@/components/dialogs/delete-confirmation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  item: Item;
};

export const NavigationButtonOptions = ({ item }: Props) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const { duplicateItem } = useNavigationStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute right-2 top-1/2 -translate-y-1/2">
          <EllipsisVertical className="!text-secondary size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[240px]">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => toast.success("Page set as first page!")}
            >
              <Flag className="fill-[#2F72E2] text-[#2F72E2]" />
              Set as first page
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
              <PenLine />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("Page copied!")}>
              <Clipboard />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => duplicateItem(item.id)}>
              <Duplicate />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-2" />
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="text-destructive" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmation
        item={item}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
      <RenameDialog
        key={item.name}
        item={item}
        isOpen={isRenameDialogOpen}
        onClose={() => setIsRenameDialogOpen(false)}
      />
    </>
  );
};
