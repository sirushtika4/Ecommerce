<template>
  <nav class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 dark:border-slate-800/80 dark:bg-slate-950/95 shadow-sm backdrop-blur-xl">
    <div class="container mx-auto px-4 py-4">
      <div class="flex flex-wrap justify-between items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
            <span class="text-white font-bold">E</span>
          </div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100 hidden sm:block">Premium</h1>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-sm md:text-base">
          <span class="text-slate-600 dark:text-slate-400">{{ isLoggedIn ? `Welcome, ${username}` : 'Guest' }}</span>
          <router-link to="/" class="text-slate-700 hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">Home</router-link>
          <button
            @click="toggleTheme"
            class="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <span>{{ themeIcon }}</span>
            <span>{{ themeLabel }}</span>
          </button>
          <button class="text-slate-700 hover:text-indigo-500 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors">Cart ({{ cartStore.itemCount }})</button>
          <button
            @click="toggleLogin"
            class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-300"
          >
            {{ isLoggedIn ? 'Log Out' : 'Log In' }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
const isLoggedIn = ref(false)
const username = ref('Guest')
const theme = ref<'light' | 'dark'>('light')
const themeLabel = computed(() => theme.value === 'dark' ? 'Light Mode' : 'Dark Mode')
const themeIcon = computed(() => theme.value === 'dark' ? '☀️' : '🌙')

const applyTheme = (value: 'light' | 'dark') => {
  theme.value = value
  localStorage.setItem('theme', value)
  document.documentElement.classList.toggle('dark', value === 'dark')
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

const loadTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
    return
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
}

const loadLoginState = () => {
  const stored = localStorage.getItem('login')
  if (stored === 'true') {
    isLoggedIn.value = true
    username.value = 'User'
  }
}

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value
  username.value = isLoggedIn.value ? 'User' : 'Guest'
  localStorage.setItem('login', isLoggedIn.value ? 'true' : 'false')
}

onMounted(() => {
  loadTheme()
  loadLoginState()
})
</script>