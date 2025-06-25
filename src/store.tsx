import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { CircleCheck, Info } from "lucide-react";

type Item = {
  icon?: React.ReactNode;
  name: string;
  id: string;
};

type NavigationState = {
  items: Item[];
  addItem: (item: Item) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  items: [
    { name: "Info", id: "1", icon: <Info /> },
    { name: "Details", id: "2" },
    { name: "Other", id: "3" },
    { name: "Ending", id: "4", icon: <CircleCheck /> },
  ],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: uuid() }],
    })),
}));
