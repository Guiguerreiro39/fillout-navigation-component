import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { Item } from "@/store";
import { z } from "zod";
import { toast } from "sonner";

type Props = {
  isActive: boolean;
  isEditing: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
  onEditingEnd: (name: string) => void;
  className?: string;
  item: Item;
};

const schema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(36, "Name must be at most 36 characters long");

export const NavigationButton = ({
  isActive,
  item,
  onClick,
  onDoubleClick,
  onEditingEnd,
  isEditing,
  className,
}: Props) => {
  const [name, setName] = useState(item.name);

  const handleEditingEnd = () => {
    try {
      schema.parse(name);
      onEditingEnd(name);
    } catch (e) {
      if (e instanceof z.ZodError) {
        toast.error(e.errors[0].message);
        setName(item.name);
      }
    }
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
        onDoubleClick={onDoubleClick}
        className={className}
      >
        {item.icon}
        {isEditing ? (
          <input
            className="field-sizing-content focus:outline-ring/25"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleEditingEnd}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEditingEnd();
              }
            }}
          />
        ) : (
          <p>{item.name}</p>
        )}
      </Button>
    </motion.div>
  );
};
