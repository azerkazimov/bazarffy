import { create } from "zustand";
import productAPI from "@/service/api.products";
import type { Product } from "@/types/product.types";

type CreateProductData = Omit<Product, '_id'>;

interface CategoryCount {
    category: string;
    count: number;
}

interface CategoryCounts {
    categories: CategoryCount[];
    total: number;
}

interface ProductState {
    products: Product[];
    searchResults: Product[];
    categoryCounts: CategoryCounts | null;
    isLoading: boolean;
    error: string | null;
    currentSort: string;
    searchQuery: string;
    isSearching: boolean;
    setCurrentSort: (sortBy: string) => void;
    getProducts: () => Promise<void>;
    createProduct: (product: CreateProductData) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (id: string, product: Product) => Promise<void>;
    getProductById: (id: string) => Promise<void>;
    sortProducts: (sortBy: string) => Promise<void>;
    searchProducts: (searchQuery: string) => Promise<void>;
    setSearchQuery: (searchQuery: string) => void;
    clearSearch: () => void;
    getCategoryCounts: () => Promise<void>;
    getProductsByCategory: (category: string, sortBy?: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    searchResults: [],
    categoryCounts: null,
    currentSort: "latest",
    searchQuery: "",
    isLoading: false,
    isSearching: false,
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
            // Refresh category counts
            const countsResponse = await productAPI.getCategoryCounts();
            set({ categoryCounts: countsResponse.data });
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
            // Refresh category counts
            const countsResponse = await productAPI.getCategoryCounts();
            set({ categoryCounts: countsResponse.data });
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
            // Refresh category counts in case category changed
            const countsResponse = await productAPI.getCategoryCounts();
            set({ categoryCounts: countsResponse.data });
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
    },
    sortProducts: async (sortBy: string) => {
        set({ isLoading: true });
        try {
            const products = await productAPI.sortProducts(sortBy);
            set({ products: products.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ isLoading: false });
            return;
        }finally {
            set({ isLoading: false });
        }
    },
    setCurrentSort: (sortBy: string) => set({ currentSort: sortBy }),
    searchProducts: async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            set({ searchResults: [], isSearching: false });
            return;
        }
        set({ isSearching: true });
        try {
            const products = await productAPI.searchProducts(searchQuery);
            set({ searchResults: products.data, isSearching: true });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
            set({ searchResults: [], isSearching: false });
            return;
        }
    },
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
    clearSearch: () => set({ searchQuery: "", searchResults: [], isSearching: false }),
    getCategoryCounts: async () => {
        try {
            const response = await productAPI.getCategoryCounts();
            set({ categoryCounts: response.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        }
    },
    getProductsByCategory: async (category: string, sortBy?: string) => {
        set({ isLoading: true });
        try {
            const response = await productAPI.getProductsByCategory(category, sortBy);
            set({ products: response.data });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        } finally {
            set({ isLoading: false });
        }
    },
}))

