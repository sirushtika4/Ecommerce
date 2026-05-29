<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <div class="rounded-3xl border border-slate-200/80 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 shadow-sm p-6">
        <div class="mb-6">
          <h2 class="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-3">Filter Products</h2>
          <h1 class="text-4xl font-bold text-slate-900 dark:text-slate-100">Product Catalog</h1>
          <p class="text-slate-600 dark:text-slate-400 mt-2">Explore our premium collection</p>
        </div>
        <SearchBar v-model:searchQuery="searchQuery" @update:category="selectedCategory = $event" />
      </div>
    </div>
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p class="text-gray-400 mt-4">Loading products...</p>
      </div>
    </div>
    <div v-else-if="error" class="text-center py-16 bg-red-500/10 border border-red-500/20 rounded-3xl">
      <p class="text-red-600 dark:text-red-300">{{ error }}</p>
    </div>
    <div v-else-if="filteredProducts.length === 0" class="text-center py-16">
      <p class="text-slate-600 dark:text-slate-400 text-lg">No products found. Try adjusting your search.</p>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
const selectedCategory = ref('');

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = !searchQuery.value || 
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    const matchesCategory = !selectedCategory.value || 
      product.category?.toLowerCase().includes(selectedCategory.value.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });
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

