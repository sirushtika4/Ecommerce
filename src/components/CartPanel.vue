<template>
  <aside class="sticky top-24 space-y-6">
    <div class="rounded-3xl border border-slate-200/80 bg-white/95 dark:border-slate-800 dark:bg-slate-950/95 shadow-sm p-6">
      <div class="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Shopping Cart</h2>
          <p class="text-sm text-slate-600 dark:text-slate-400">Manage your selected items</p>
        </div>
        <span class="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 px-3 py-1 text-sm font-semibold">
          {{ cartStore.itemCount }} items
        </span>
      </div>

      <div v-if="cartStore.items.length === 0" class="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-6 text-center">
        <p class="text-slate-800 dark:text-slate-200 font-semibold mb-2">Your cart is empty</p>
        <p class="text-sm text-slate-500 dark:text-slate-400">Add products to see them here and start checkout.</p>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4"
        >
          <div class="flex gap-4">
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-24 h-24 rounded-3xl object-cover border border-slate-200 dark:border-slate-800"
            />
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">{{ item.product.title }}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">${{ item.product.price.toFixed(2) }}</p>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex flex-wrap items-center gap-3">
                  <div class="inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-2.5 py-1">
                    <button
                      @click="decrementQuantity(item.product.id)"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span class="mx-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{{ item.quantity }}</span>
                    <button
                      @click="incrementQuantity(item.product.id)"
                      class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="removeFromCart(item.product.id)"
                    class="text-sm font-semibold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>
                <div class="text-xs text-slate-500 dark:text-slate-400">Category: {{ item.product.category }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Subtotal</span>
            <span class="text-2xl font-bold text-slate-900 dark:text-white">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between mb-5 text-sm text-slate-600 dark:text-slate-400">
            <span>Total Items</span>
            <span>{{ cartStore.itemCount }}</span>
          </div>
          <button
            @click="clearCart"
            class="w-full mb-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100 py-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            Clear Cart
          </button>
          <button
            :disabled="cartStore.items.length === 0"
            class="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-3 font-semibold shadow-lg shadow-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useCartStore } from '../store/cart';

const cartStore = useCartStore();

const incrementQuantity = (productId: number) => {
  cartStore.incrementQuantity(productId);
};

const decrementQuantity = (productId: number) => {
  cartStore.decrementQuantity(productId);
};

const removeFromCart = (productId: number) => {
  cartStore.removeFromCart(productId);
};

const clearCart = () => {
  cartStore.clearCart();
};
</script>
