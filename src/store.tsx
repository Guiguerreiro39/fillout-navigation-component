import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { CircleCheck, Info } from "lucide-react";

export type Item = {
  icon?: React.ReactNode;
  name: string;
  id: string;
};

type NavigationState = {
  sortableItems: Item[];
  endingItem: Item;
  addItem: (name: string) => Item;
  sortItems: (items: Item[]) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  sortableItems: [
    { name: "Info", id: "1", icon: <Info /> },
    { name: "Details", id: "2" },
    { name: "Other", id: "3" },
  ],
  endingItem: { name: "Ending", id: "4", icon: <CircleCheck /> },
  addItem: (name) => {
    const newItem = {
      name,
      id: uuid(),
    };

    // Always maintains the ending at the end
    set((state) => ({
      sortableItems: [...state.sortableItems, newItem],
    }));

    return newItem;
  },
  sortItems: (items) => {
    set(() => ({
      sortableItems: items,
    }));
  },
}));
