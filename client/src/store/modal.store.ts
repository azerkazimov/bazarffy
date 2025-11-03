import { create } from "zustand";
import type { Product } from "@/types/product.types";

interface ModalStore {
    isOpen: boolean;
    editingProduct: Product | null;
    openModal: () => void;
    closeModal: () => void;
    openModalWithProduct: (product: Product) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    editingProduct: null,
    openModal: () => set({ isOpen: true, editingProduct: null }),
    closeModal: () => set({ isOpen: false, editingProduct: null }),
    openModalWithProduct: (product: Product) => set({ isOpen: true, editingProduct: product }),
}));