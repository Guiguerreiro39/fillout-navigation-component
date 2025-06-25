"use client";

import { Item } from "@/store";
import { NavigationButton } from "./navigation-button";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FileText } from "lucide-react";
import { Dash } from "@/app/_components/dash";
import { NewPage } from "@/app/_components/new-page";

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
          {index > 0 && <Dash />}
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
      <Dash />
      <NewPage key={items.length} defaultName={`Page ${items.length + 1}`} />
    </div>
  );
};
