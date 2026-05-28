<template>
  <div class="mb-6">
    <input
      v-model="localQuery"
      type="text"
      placeholder="Search products by title..."
      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
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
}>();

const localQuery = ref(props.searchQuery);

watch(localQuery, (newValue) => {
  emit('update:searchQuery', newValue);
});

watch(() => props.searchQuery, (newValue) => {
  localQuery.value = newValue;
});
</script>