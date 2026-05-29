<template>
  <div class="mb-8 space-y-4">
    <div class="flex flex-col md:flex-row gap-4">
      <div class="flex-1 relative">
        <svg class="absolute left-3 top-3.5 w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          v-model="localQuery"
          type="text"
          placeholder="Search by title or keyword..."
          class="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 text-slate-900 placeholder-slate-500 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 dark:placeholder-slate-500"
        />
      </div>
      <select
        v-model="selectedCategory"
        class="px-4 py-3 bg-slate-100 border border-slate-200 text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 cursor-pointer dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100"
      >
        <option value="">All Categories</option>
        <option value="beauty">Beauty</option>
        <option value="fragrances">Fragrances</option>
        <option value="skincare">Skincare</option>
        <option value="makeup">Makeup</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  searchQuery: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:searchQuery': [value: string];
  'update:category': [value: string];
}>();

const localQuery = ref(props.searchQuery);
const selectedCategory = ref('');

watch(localQuery, (newValue) => {
  emit('update:searchQuery', newValue);
});

watch(selectedCategory, (newValue) => {
  emit('update:category', newValue);
});

watch(() => props.searchQuery, (newValue) => {
  localQuery.value = newValue;
});
</script>