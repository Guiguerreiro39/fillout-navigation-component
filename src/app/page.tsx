"use client";

import { NavigationButton } from "@/app/_components/navigation-button";
import { useNavigationStore } from "@/store";
import { FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Home() {
  const store = useNavigationStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  const activeItem = searchParams.get("activeItem") ?? store.items[0].id;

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-[#F9FAFB]">
      <div className="flex items-center">
        {store.items.map((item, index) => (
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
    </div>
  );
}
