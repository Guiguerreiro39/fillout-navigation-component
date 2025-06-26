"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/store";
import { Plus } from "lucide-react";
import { Item } from "@/store";

type Props = {
  disabled?: boolean;
  index?: number;
  onItemAdd?: (item: Item) => void;
};

export const Dash = ({ disabled = false, index, onItemAdd }: Props) => {
  const addItem = useNavigationStore((state) => state.addItem);

  const handleOnClick = () => {
    const newItem = addItem("New page", index);
    onItemAdd?.(newItem);
  };

  return (
    <div className="group flex items-center h-[20px] relative">
      <hr
        className={cn(
          "w-[20px] transition-all border-[1.5px] border-dashed border-[#C0C0C0]",
          !disabled && "group-hover:w-[50px]"
        )}
      />
      {!disabled && (
        <Button
          onClick={handleOnClick}
          size="icon"
          className="rounded-full absolute group-hover:opacity-100 not-group-hover:pointer-events-none opacity-0 transition-all left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Plus className="!text-foreground !size-[8px]" />
        </Button>
      )}
    </div>
  );
};
