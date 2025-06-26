import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { CircleCheck, FileText, Info } from "lucide-react";

export type Item = {
  icon: React.ReactNode;
  name: string;
  id: string;
};

type NavigationState = {
  sortableItems: Item[];
  endingItem: Item;
  addItem: (name: string, index?: number) => Item;
  sortItems: (items: Item[]) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  sortableItems: [
    { name: "Info", id: "1", icon: <Info /> },
    { name: "Details", id: "2", icon: <FileText /> },
    { name: "Other", id: "3", icon: <FileText /> },
  ],
  endingItem: { name: "Ending", id: "4", icon: <CircleCheck /> },
  addItem: (name, index) => {
    const newItem = {
      name,
      id: uuid(),
      icon: <FileText />,
    };

    if (index) {
      set((state) => {
        const sortableItems = [...state.sortableItems];
        sortableItems.splice(index, 0, newItem);
        return { sortableItems };
      });
    } else {
      set((state) => ({
        sortableItems: [...state.sortableItems, newItem],
      }));
    }

    return newItem;
  },
  sortItems: (items) => {
    set(() => ({
      sortableItems: items,
    }));
  },
}));
