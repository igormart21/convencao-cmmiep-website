import { create } from "zustand";

interface CartUIState {
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartUIStore = create<CartUIState>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  setOpen: (open) => set({ isOpen: open }),
}));
