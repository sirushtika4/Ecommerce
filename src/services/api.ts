import axios from 'axios';
import type { ProductsResponse, Product } from '../types';

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Function to fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<ProductsResponse>('/products');
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};