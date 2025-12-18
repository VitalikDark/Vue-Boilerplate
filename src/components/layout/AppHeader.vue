<template>
  <header class="bg-white shadow-md">
    <div class="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-[215px] py-4">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0"
          aria-label="Home"
        >
          <img
            :src="logoUrl"
            alt="News App Logo"
            width="142"
            height="32"
            class="h-8 w-auto"
          >
        </router-link>
        <div class="flex items-center">
          <div
            v-if="userStore.user"
            class="flex items-center gap-3"
          >
            <span class="font-normal text-16 text-black">{{ userStore.user.name }}</span>
            <img
              :src="userStore.user.avatar"
              :alt="userStore.user.name"
              class="w-8 h-8 rounded-full"
            >
          </div>
          <div
            v-else-if="userStore.loading"
            class="animate-pulse flex items-center gap-3"
          >
            <div class="h-4 w-24 bg-gray-200 rounded"></div>
            <div class="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import logoUrl from '@/assets/icons/logo.svg';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

onMounted(() => {
  userStore.loadUser();
});
</script>
