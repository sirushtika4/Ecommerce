<template>
  <nav class="bg-blue-600 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">E-Commerce Store</h1>
      <div class="flex items-center space-x-4">
        <router-link to="/" class="hover:text-blue-200">Home</router-link>
        <div class="relative">
          <button class="hover:text-blue-200">
            Cart ({{ cartStore.itemCount }})
          </button>
          <!-- Optional: Add a cart dropdown or link to cart page -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
</script>