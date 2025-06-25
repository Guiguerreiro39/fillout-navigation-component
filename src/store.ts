import { v4 as uuid } from "uuid";
import { create } from "zustand";

type Item = {
  name: string;
  id: string;
};

type NavigationState = {
  items: Item[];
  addItem: (item: Item) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  items: [
    { name: "Info", id: uuid() },
    { name: "Details", id: uuid() },
    { name: "Other", id: uuid() },
    { name: "Ending", id: uuid() },
  ],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: uuid() }],
    })),
}));
