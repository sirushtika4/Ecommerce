<template>
  <div class="container mx-auto p-4">
    <SearchBar v-model:searchQuery="searchQuery" />
    <div v-if="loading" class="text-center py-8">Loading products...</div>
    <div v-else-if="error" class="text-center py-8 text-red-600">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';
import SearchBar from './SearchBar.vue';
import { fetchProducts } from '../services/api';
import type { Product } from '../types';

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const searchQuery = ref('');

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;
  return products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  loading.value = true;
  try {
    products.value = await fetchProducts();
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load products';
  } finally {
    loading.value = false;
  }
});
</script>

