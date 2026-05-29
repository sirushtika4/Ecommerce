<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p class="text-gray-400 mt-4">Loading product...</p>
      </div>
    </div>
    <div v-else-if="error" class="text-center py-16 bg-red-500/10 border border-red-500/20 rounded-3xl">
      <p class="text-red-600 dark:text-red-300">{{ error }}</p>
    </div>
    <div v-else-if="product" class="max-w-5xl mx-auto">
      <button @click="goBack" class="text-indigo-600 dark:text-indigo-300 hover:text-indigo-500 dark:hover:text-indigo-200 mb-6 flex items-center gap-2">
        <span>&larr;</span> Back
      </button>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Product Images -->
        <div>
          <div class="bg-slate-100 dark:bg-slate-950 rounded-3xl overflow-hidden mb-4 shadow-sm dark:shadow-none">
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full h-96 object-cover"
            />
          </div>
          <div class="grid grid-cols-4 gap-2">
            <img
              v-for="(image, index) in product.images.slice(0, 4)"
              :key="index"
              :src="image"
              :alt="`Product image ${Number(index) + 1}`"
              class="w-full h-20 object-cover rounded border border-slate-700 cursor-pointer hover:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">{{ product.title }}</h1>
          <p class="text-slate-600 dark:text-slate-400 mb-6 text-lg">{{ product.description }}</p>
          
          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-6 space-y-4 shadow-sm dark:shadow-none">
            <div class="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <span class="text-3xl font-bold text-slate-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
              <span class="text-lg text-indigo-600 dark:text-indigo-300 font-semibold">⭐ {{ product.rating.toFixed(1) }}/5</span>
            </div>
            <div>
              <span class="text-slate-500 dark:text-slate-400">Category:</span>
              <span class="text-slate-900 dark:text-slate-100 ml-2 font-semibold">{{ product.category }}</span>
            </div>
            <div>
              <span class="text-slate-500 dark:text-slate-400">Stock:</span>
              <span class="text-slate-900 dark:text-slate-100 ml-2 font-semibold">{{ product.stock }} items available</span>
            </div>
          </div>

          <div class="space-y-3">
            <button
              @click="addToCart"
              class="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-indigo-500/50"
            >
              Add to Cart
            </button>
            <button
              class="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold py-3 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
            >
              ❤️ Save for Later
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchProductById } from '../services/api';
import { useCartStore } from '../store/cart';
import type { Product } from '../types';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const product = ref<Product | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const loadProduct = async () => {
  const id = Number(route.params.id);
  if (isNaN(id)) {
    error.value = 'Invalid product ID';
    return;
  }

  loading.value = true;
  error.value = null;
  try {
    product.value = await fetchProductById(id);
  } catch (err) {
    error.value = 'Failed to load product. Please try again.';
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  loadProduct();
});
</script>