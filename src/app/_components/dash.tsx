"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigationStore } from "@/store";
import { Plus } from "lucide-react";

type Props = {
  disabled?: boolean;
  index?: number;
};

export const Dash = ({ disabled = false, index }: Props) => {
  const addItem = useNavigationStore((state) => state.addItem);

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
          onClick={() => addItem("New page", index)}
          size="icon"
          className="rounded-full absolute group-hover:opacity-100 not-group-hover:pointer-events-none opacity-0 transition-all left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Plus className="!text-foreground !size-[8px]" />
        </Button>
      )}
    </div>
  );
};
