import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const applyInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const theme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : (systemPrefersDark ? 'dark' : 'light')

  document.documentElement.classList.toggle('dark', theme === 'dark')
  if (!storedTheme) {
    localStorage.setItem('theme', theme)
  }
}

applyInitialTheme()

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')