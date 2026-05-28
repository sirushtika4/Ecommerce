<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center py-8">Loading product...</div>
    <div v-else-if="error" class="text-center py-8 text-red-600">{{ error }}</div>
    <div v-else-if="product" class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Product Images -->
        <div>
          <img
            :src="product.thumbnail"
            :alt="product.title"
            class="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div class="grid grid-cols-4 gap-2 mt-4">
            <img
              v-for="(image, index) in product.images.slice(0, 4)"
              :key="index"
              :src="image"
              :alt="`Product image ${Number(index) + 1}`"
              class="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <div class="mb-4">
            <span class="text-2xl font-bold text-green-600">${{ product.price }}</span>
            <span class="ml-4 text-sm text-gray-600">⭐ {{ product.rating }}</span>
          </div>
          <div class="mb-4">
            <span class="font-semibold">Category:</span> {{ product.category }}
          </div>
          <div class="mb-4">
            <span class="font-semibold">Stock:</span> {{ product.stock }}
          </div>
          <button
            @click="addToCart"
            class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchProductById } from '../services/api';
import { useCartStore } from '../store/cart';
import type { Product } from '../types';

const route = useRoute();
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

onMounted(() => {
  loadProduct();
});
</script>