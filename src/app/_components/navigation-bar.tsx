"use client";

import { Item } from "@/store";
import { NavigationButton } from "./navigation-button";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FileText } from "lucide-react";

type Props = {
  items: Item[];
  activeItem: string;
};

export const NavigationBar = ({ items, activeItem }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && (
            <hr className="w-[20px] h-[2px] border-dashed border-[#C0C0C0]" />
          )}
          <NavigationButton
            isActive={item.id === activeItem}
            onClick={() => {
              router.push(`?activeItem=${item.id}`);
            }}
          >
            {item.icon ?? <FileText />}
            {item.name}
          </NavigationButton>
        </Fragment>
      ))}
    </div>
  );
};
