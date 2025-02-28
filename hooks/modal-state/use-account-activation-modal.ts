import { create } from "zustand";

interface IUseAccountActivationModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export const useAccountActivationModal = create<IUseAccountActivationModal>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
  })
);
