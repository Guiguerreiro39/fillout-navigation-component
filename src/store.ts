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
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
