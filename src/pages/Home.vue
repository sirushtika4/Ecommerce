<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div class="space-y-8">
        <ProductList />
      </div>
      <CartPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductList from '../components/ProductList.vue';
import CartPanel from '../components/CartPanel.vue';
</script>