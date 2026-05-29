<template>
  <div
    class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl dark:hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
    @click="goToDetail"
  >
    <div class="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-950">
      <img :src="product.thumbnail" :alt="product.title" class="w-full h-full object-cover" />
    </div>
    <div class="p-5">
      <h3 class="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100 truncate">{{ product.title }}</h3>
      <p class="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{{ product.description || 'High-quality product' }}</p>
      <div class="flex justify-between items-center mb-4">
        <span class="text-2xl font-bold text-slate-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
        <span class="text-sm text-indigo-600 dark:text-indigo-300 font-semibold">⭐ {{ product.rating.toFixed(1) }}</span>
      </div>
      <button
        @click.stop="addToCart"
        class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-indigo-500/50"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';
import type { Product } from '../types';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const router = useRouter();
const cartStore = useCartStore();

const goToDetail = () => {
  router.push(`/product/${props.product.id}`);
};

const addToCart = () => {
  cartStore.addToCart(props.product);
};
</script>