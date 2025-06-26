"use client";

import { NavigationBar } from "@/app/_components/navigation-bar";
import { useNavigationStore } from "@/store";
import { PageContent } from "./_components/page-content";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Home() {
  const items = useNavigationStore();

  const allItems = useMemo(
    () => [...items.sortableItems, items.endingItem],
    [items]
  );

  const searchParams = useSearchParams();

  const activeItem =
    searchParams.get("activeItem") ?? items.sortableItems[0].id;

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB] flex flex-col">
      <PageContent item={allItems.find((item) => item.id === activeItem)} />
      <NavigationBar
        sortableItems={items.sortableItems}
        endingItem={items.endingItem}
        activeItem={activeItem}
      />
    </div>
  );
}
