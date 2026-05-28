<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    @click="goToDetail"
  >
    <img :src="product.thumbnail" :alt="product.title" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ product.title }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-green-600">${{ product.price }}</span>
        <span class="text-sm text-gray-600">⭐ {{ product.rating }}</span>
      </div>
      <button
        @click.stop="addToCart"
        class="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
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