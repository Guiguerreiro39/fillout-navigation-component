import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { CircleCheck, Info } from "lucide-react";

export type Item = {
  icon?: React.ReactNode;
  name: string;
  id: string;
};

type NavigationState = {
  items: Item[];
  addItem: (name: string) => Item;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  items: [
    { name: "Info", id: "1", icon: <Info /> },
    { name: "Details", id: "2" },
    { name: "Other", id: "3" },
    { name: "Ending", id: "4", icon: <CircleCheck /> },
  ],
  addItem: (name) => {
    const newItem = {
      name,
      id: uuid(),
    };

    set((state) => ({
      items: [...state.items, newItem],
    }));

    return newItem;
  },
}));
