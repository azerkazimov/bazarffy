import { create } from "zustand";
import productAPI from "@/service/api.products";
import type { Product } from "@/types/product.types";

type CreateProductData = Omit<Product, '_id'>;

interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    getProducts: () => Promise<void>;
    createProduct: (product: CreateProductData) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (id: string, product: Product) => Promise<void>;
    getProductById: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    isLoading: false,
    error: null,
    getProducts: async () => {
        set({ isLoading: true });
        try {
            const products = await productAPI.getProducts();
            set({ products: products.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }
        finally {
            set({ isLoading: false });
        }
    },
    createProduct: async (product: CreateProductData) => {
        set({ isLoading: true });
        try {
            const newProduct = await productAPI.createProduct(product);
            set((state) => ({ products: [...state.products, newProduct.data] }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }
        finally {
            set({ isLoading: false });
        }
    },
    deleteProduct: async (id: string) => {
        set({ isLoading: true });
        try {
            await productAPI.deleteProduct(id);
            set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }finally {
            set({ isLoading: false });
        }
    },
    updateProduct: async (id: string, product: Product) => {
        set({ isLoading: true });
        try {
            const updatedProduct = await productAPI.updateProduct(id, product);
            set((state) => ({ products: state.products.map((p) => p._id === id ? updatedProduct.data : p) }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }finally {
            set({ isLoading: false });
        }
    },
    getProductById: async (id: string) => {
        set({ isLoading: true });
        try {
            const product = await productAPI.getProductById(id);
            set({ products: [product.data] });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }finally {
            set({ isLoading: false });
        }
    }
}))

