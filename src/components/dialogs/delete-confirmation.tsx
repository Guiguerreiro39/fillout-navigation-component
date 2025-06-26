"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Item, useNavigationStore } from "@/store";

type Props = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
};

export const DeleteConfirmation = ({ item, isOpen, onClose }: Props) => {
  const deleteItem = useNavigationStore((state) => state.deleteItem);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            page.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={() => deleteItem(item.id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
