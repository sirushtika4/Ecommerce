<template>
  <div
    class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:border-indigo-500/30 hover:shadow-xl dark:hover:shadow-indigo-500/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
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
      <div class="flex gap-3">
        <button
          @click.stop="openModal"
          class="flex-1 bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-slate-500/50"
        >
          Details
        </button>
        <button
          @click.stop="addToCart"
          class="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-indigo-500/50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>

  <!-- Product Details Modal -->
  <teleport to="body">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
      @click="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        @click.stop
      >
        <!-- Close Button -->
        <div class="sticky top-0 flex justify-end p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button
            @click="closeModal"
            class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Product Image Gallery -->
          <div class="mb-6">
            <div class="relative h-80 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950 mb-3">
              <img
                :src="product.images && product.images.length > 0 ? product.images[currentImageIndex] : product.thumbnail"
                :alt="product.title"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Image Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="flex gap-2 overflow-x-auto">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
                :class="currentImageIndex === index ? 'border-indigo-500' : 'border-slate-300 dark:border-slate-700'"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Product Information -->
          <h2 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{{ product.title }}</h2>
          
          <!-- Rating and Price -->
          <div class="flex items-center justify-between mb-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div class="flex items-center gap-2">
              <span class="text-xl text-indigo-600 dark:text-indigo-300 font-semibold">⭐ {{ product.rating.toFixed(1) }}</span>
              <span class="text-sm text-slate-600 dark:text-slate-400">(Highly Rated)</span>
            </div>
            <span class="text-3xl font-bold text-slate-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <h3 class="font-bold text-lg mb-2 text-slate-900 dark:text-white">Description</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{{ product.description }}</p>
          </div>

          <!-- Product Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Category</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.category }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Brand</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.brand }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Stock</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.stock }} units available</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">SKU</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.sku }}</p>
            </div>
          </div>

          <!-- Warranty and Shipping -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Warranty</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.warrantyInformation }}</p>
            </div>
            <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg">
              <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Shipping</p>
              <p class="font-semibold text-slate-900 dark:text-white">{{ product.shippingInformation }}</p>
            </div>
          </div>

          <!-- Dimensions -->
          <div v-if="product.dimensions" class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg mb-6">
            <p class="font-bold text-slate-900 dark:text-white mb-2">Dimensions</p>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-slate-600 dark:text-slate-400">Width</p>
                <p class="font-semibold text-slate-900 dark:text-white">{{ product.dimensions.width }} cm</p>
              </div>
              <div>
                <p class="text-sm text-slate-600 dark:text-slate-400">Height</p>
                <p class="font-semibold text-slate-900 dark:text-white">{{ product.dimensions.height }} cm</p>
              </div>
              <div>
                <p class="text-sm text-slate-600 dark:text-slate-400">Depth</p>
                <p class="font-semibold text-slate-900 dark:text-white">{{ product.dimensions.depth }} cm</p>
              </div>
            </div>
          </div>

          <!-- Return Policy -->
          <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg mb-6">
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">Return Policy</p>
            <p class="font-semibold text-slate-900 dark:text-white">{{ product.returnPolicy }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              @click="addToCart"
              class="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:shadow-lg hover:shadow-indigo-500/50"
            >
              Add to Cart
            </button>
            <button
              @click="closeModal"
              class="flex-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 rounded-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../store/cart';
import type { Product } from '../types';

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const cartStore = useCartStore();

const showModal = ref(false);
const currentImageIndex = ref(0);

const openModal = () => {
  showModal.value = true;
  currentImageIndex.value = 0;
};

const closeModal = () => {
  showModal.value = false;
};

const addToCart = () => {
  cartStore.addToCart(props.product);
};
</script>