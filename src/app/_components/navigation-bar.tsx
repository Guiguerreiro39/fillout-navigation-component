"use client";

import { Item, useNavigationStore } from "@/store";
import { NavigationButton } from "./navigation-button";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { NewPage } from "@/app/_components/new-page";
import { Dash } from "@/app/_components/dash";
import { Reorder } from "framer-motion";
import { useState } from "react";

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
        {sortableItems.map((item) => (
          <div key={item.id} className="flex items-center">
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
                {item.icon ?? <FileText />}
                {item.name}
              </NavigationButton>
            </Reorder.Item>
            <Dash />
          </div>
        ))}
        <div className="flex items-center">
          <NavigationButton
            className={isDragging ? "cursor-grabbing" : undefined}
            isActive={endingItem.id === activeItem}
            onClick={() => {
              if (isDragging) return;
              router.push(`?activeItem=${endingItem.id}`);
            }}
          >
            {endingItem.icon ?? <FileText />}
            {endingItem.name}
          </NavigationButton>
          <Dash />
        </div>
        <NewPage
          key={sortableItems.length}
          defaultName={`Page ${sortableItems.length + 2}`}
        />
      </div>
    </Reorder.Group>
  );
};
