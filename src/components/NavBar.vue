<template>
  <nav class="bg-blue-600 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">E-Commerce Store</h1>
      <div class="flex items-center space-x-4">
        <span class="text-sm">{{ isLoggedIn ? `Welcome, ${username}` : 'Guest' }}</span>
        <router-link to="/" class="hover:text-blue-200">Home</router-link>
        <div class="relative">
          <button class="hover:text-blue-200">
            Cart ({{ cartStore.itemCount }})
          </button>
          <!-- Optional: Add a cart dropdown or link to cart page -->
        </div>
        <button
          @click="toggleLogin"
          class="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          {{ isLoggedIn ? 'Log Out' : 'Log In' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();
const isLoggedIn = ref(false);
const username = ref('Guest');

const loadLoginState = () => {
  const stored = localStorage.getItem('login');
  if (stored === 'true') {
    isLoggedIn.value = true;
    username.value = 'User';
  }
};

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;
  username.value = isLoggedIn.value ? 'User' : 'Guest';
  localStorage.setItem('login', String(isLoggedIn.value));
};

loadLoginState();
</script>