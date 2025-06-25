"use client";

import { NavigationBar } from "@/app/_components/navigation-bar";
import { useNavigationStore } from "@/store";
import { PageContent } from "./_components/page-content";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const items = useNavigationStore((state) => state.items);

  const searchParams = useSearchParams();

  const activeItem = searchParams.get("activeItem") ?? items[0].id;

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB] flex flex-col gap-4">
      <PageContent item={items.find((item) => item.id === activeItem)} />
      <NavigationBar items={items} activeItem={activeItem} />
    </div>
  );
}
