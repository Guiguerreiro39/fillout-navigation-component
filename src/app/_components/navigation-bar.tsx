"use client";

import { Item, useNavigationStore } from "@/store";
import { NavigationButton } from "./navigation-button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { NewPageDialog } from "@/app/_components/new-page-dialog";
import { Dash } from "@/app/_components/dash";
import { motion, Reorder } from "framer-motion";
import { useState } from "react";
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
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const sortItems = useNavigationStore((state) => state.sortItems);
  const updateItem = useNavigationStore((state) => state.updateItem);

  const router = useRouter();

  const handleEditingEnd = (id: string, newName: string) => {
    setIsEditing(null);
    updateItem(id, newName);
  };

  return (
    <Reorder.Group values={sortableItems} onReorder={sortItems} axis="x">
      <div className="flex items-center overflow-auto w-full py-4">
        {sortableItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center"
          >
            <Reorder.Item
              value={item}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => setTimeout(() => setIsDragging(false), 0)}
            >
              <NavigationButton
                className={isDragging ? "cursor-grabbing" : undefined}
                isActive={item.id === activeItem}
                isEditing={isEditing === item.id}
                onClick={() => {
                  if (isDragging) return;
                  router.push(`?activeItem=${item.id}`);
                }}
                onDoubleClick={() => setIsEditing(item.id)}
                onEditingEnd={(name) => handleEditingEnd(item.id, name)}
                item={item}
              />
            </Reorder.Item>
            <Dash
              index={index + 1}
              onItemAdd={(item) => {
                router.push(`?activeItem=${item.id}`);
                setIsEditing(item.id);
              }}
            />
          </motion.div>
        ))}
        <NavigationButton
          isActive={endingItem.id === activeItem}
          onClick={() => {
            if (isDragging) return;
            router.push(`?activeItem=${endingItem.id}`);
          }}
          isEditing={isEditing === endingItem.id}
          onDoubleClick={() => setIsEditing(endingItem.id)}
          onEditingEnd={(name) => handleEditingEnd(endingItem.id, name)}
          item={endingItem}
        />

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
