import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

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
    <Button
      variant={isActive ? "active" : "default"}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};
