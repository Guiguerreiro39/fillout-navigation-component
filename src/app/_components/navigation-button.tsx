import { Button } from "@/components/ui/button";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isActive: boolean;
  onClick: () => void;
}>;

export const NavigationButton = ({ isActive, children, onClick }: Props) => {
  return (
    <Button variant={isActive ? "active" : "default"} onClick={onClick}>
      {children}
    </Button>
  );
};
