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
  updateItem: (id: string, name: string) => void;
  deleteItem: (id: string) => void;
  duplicateItem: (id: string) => void;
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
  updateItem: (id, name) => {
    set((state) => {
      const sortableItems = [...state.sortableItems];
      const item = sortableItems.find((item) => item.id === id);

      if (item) {
        item.name = name;
      }

      return { sortableItems };
    });
  },
  deleteItem: (id) => {
    set((state) => {
      const sortableItems = [...state.sortableItems];
      const itemIndex = sortableItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        sortableItems.splice(itemIndex, 1);
      }

      return { sortableItems };
    });
  },
  duplicateItem: (id) => {
    set((state) => {
      const sortableItems = [...state.sortableItems];
      const itemIndex = sortableItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const item = sortableItems[itemIndex];
        const newItem = {
          name: item.name,
          id: uuid(),
          icon: item.icon,
        };
        sortableItems.splice(itemIndex + 1, 0, newItem);
      }

      return { sortableItems };
    });
  },
  sortItems: (items) => {
    set(() => ({
      sortableItems: items,
    }));
  },
}));
