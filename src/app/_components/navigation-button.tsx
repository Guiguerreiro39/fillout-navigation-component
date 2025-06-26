import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Item, useNavigationStore } from "@/store";
import { cn } from "@/lib/utils";

type Props = {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  item: Item;
};

export const NavigationButton = ({
  isActive,
  item,
  onClick,
  className,
}: Props) => {
  const [name, setName] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);

  const updateItem = useNavigationStore((state) => state.updateItem);

  const handleBlur = () => {
    setIsEditing(false);
    updateItem(item.id, name);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={isActive ? "active" : "default"}
        onClick={onClick}
        onDoubleClick={() => setIsEditing(true)}
        className={cn(className, "transition-none")}
      >
        {item.icon}
        {isEditing ? (
          <input
            className="field-sizing-content focus:outline-ring/25"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlur();
              }
            }}
          />
        ) : (
          <>{item.name}</>
        )}
      </Button>
    </motion.div>
  );
};
