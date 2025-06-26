"use client";

import { NavigationBar } from "@/app/_components/navigation-bar";
import { useNavigationStore } from "@/store";
import { PageContent } from "./_components/page-content";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen">
          <LoaderCircle className="size-8 animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

const HomeContent = () => {
  const { endingItem, sortableItems } = useNavigationStore();

  const allItems = useMemo(
    () => [...sortableItems, endingItem],
    [sortableItems, endingItem]
  );

  const searchParams = useSearchParams();

  const activeItem = searchParams.get("activeItem") ?? sortableItems[0].id;

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB] flex flex-col">
      <PageContent item={allItems.find((item) => item.id === activeItem)} />
      <NavigationBar
        sortableItems={sortableItems}
        endingItem={endingItem}
        activeItem={activeItem}
      />
    </div>
  );
};
