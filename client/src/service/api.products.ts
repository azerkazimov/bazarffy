import type { Product } from "@/types/product.types";
import axios from "axios";

type CreateProductData = Omit<Product, '_id'>;

const API_BASE_URL = 'http://localhost:5009/products';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const productAPI = {
  getProducts: async () => {
    const response = await api.get('/');
    return response.data;
  },
  createProduct: async (product: CreateProductData) => {
    const response = await api.post('/', product);
    return response.data;
  },
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  },
  updateProduct: async (id: string, product: Product) => {
    const response = await api.put(`/${id}`, product);
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },
};

export default productAPI;



