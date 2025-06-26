"use client";

import { Item, useNavigationStore } from "@/store";
import { NavigationButton } from "./navigation-button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { NewPageDialog } from "@/app/_components/new-page-dialog";
import { Dash } from "@/app/_components/dash";
import { Reorder } from "framer-motion";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  sortableItems: Item[];
  endingItem: Item;
  activeItem: string;
};

export const NavigationBar = ({
  sortableItems,
  endingItem,
  activeItem,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const sortItems = useNavigationStore((state) => state.sortItems);

  const router = useRouter();

  return (
    <Reorder.Group values={sortableItems} onReorder={sortItems} axis="x">
      <div className="flex items-center">
        {sortableItems.map((item, index) => (
          <Fragment key={item.id}>
            <Reorder.Item
              value={item}
              dragListener={true}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setTimeout(() => setIsDragging(false), 0)}
            >
              <NavigationButton
                className={isDragging ? "cursor-grabbing" : undefined}
                isActive={item.id === activeItem}
                onClick={() => {
                  if (isDragging) return;
                  router.push(`?activeItem=${item.id}`);
                }}
              >
                {item.icon}
                {item.name}
              </NavigationButton>
            </Reorder.Item>
            <Dash index={index + 1} />
          </Fragment>
        ))}
        <NavigationButton
          isActive={endingItem.id === activeItem}
          onClick={() => {
            if (isDragging) return;
            router.push(`?activeItem=${endingItem.id}`);
          }}
        >
          {endingItem.icon}
          {endingItem.name}
        </NavigationButton>
        <Dash disabled />
        <NewPageDialog>
          <Button>
            <Plus className="!text-foreground" />
            Add page
          </Button>
        </NewPageDialog>
      </div>
    </Reorder.Group>
  );
};
