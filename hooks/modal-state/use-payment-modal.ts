import { create } from "zustand";

type PaymentType = "deposit" | "withdrawal" | "transfer" | "payment";

interface IUsePaymentModal {
  isOpen: boolean;
  type?: PaymentType;
  onOpen: (type: PaymentType) => void;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
}

export const usePaymentModal = create<IUsePaymentModal>((set) => ({
  isOpen: false,
  type: undefined,
  onOpen: (type: PaymentType) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: undefined }),
  onOpenChange: (open: boolean) => set({ isOpen: open }),
}));
