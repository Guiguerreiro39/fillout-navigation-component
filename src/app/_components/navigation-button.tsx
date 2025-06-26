import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

type Props = PropsWithChildren<{
  isActive: boolean;
  onClick: () => void;
  className?: string;
}>;

export const NavigationButton = ({
  isActive,
  children,
  onClick,
  className,
}: Props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={isActive ? "active" : "default"}
        onClick={onClick}
        className={className}
      >
        {children}
      </Button>
    </motion.div>
  );
};
