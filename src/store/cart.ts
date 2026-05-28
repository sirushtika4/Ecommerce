import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types';

// Define the cart item interface
interface CartItem {
  product: Product;
  quantity: number;
}

// Define the cart store
export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref<CartItem[]>([]);

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
  });

  // Actions
  const addToCart = (product: Product) => {
    const existingItem = items.value.find((item: CartItem) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({ product, quantity: 1 });
    }
    saveToLocalStorage();
  };

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
      saveToLocalStorage();
    }
  };

  const clearCart = () => {
    items.value = [];
    saveToLocalStorage();
  };

  // Load from localStorage
  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      items.value = JSON.parse(stored);
    }
  };

  // Save to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(items.value));
  };

  // Initialize by loading from localStorage
  loadFromLocalStorage();

  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
  };
});