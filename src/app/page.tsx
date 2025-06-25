"use client";

import { NavigationButton } from "@/app/_components/navigation-button";
import { useNavigationStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const store = useNavigationStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const activeItem = searchParams.get("activeItem") ?? store.items[0].id;

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB]">
      {store.items.map((item) => (
        <NavigationButton
          key={item.id}
          isActive={item.id === activeItem}
          onClick={() => {
            router.push(`?activeItem=${item.id}`);
          }}
        >
          {item.name}
        </NavigationButton>
      ))}
    </div>
  );
}
