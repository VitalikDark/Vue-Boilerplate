<template>
  <div class="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-[215px] pt-12 pb-18">
    <h1 class="text-28 font-bold text-black mb-10">
      Last news
    </h1>

    <div
      v-if="newsStore.loading && newsStore.news.length === 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[40px]"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="animate-pulse bg-white flex flex-col h-full overflow-hidden"
      >
        <div
          class="bg-gray-200 rounded-2xl w-full shrink-0 h-60"
        ></div>
        <div class="py-4 flex-1 flex flex-col">
          <div class="h-[44px] bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="flex-1 min-h-[72px]">
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mt-auto pt-4"></div>
        </div>
      </div>
    </div>

    <div
      v-else-if="newsStore.error && newsStore.news.length === 0"
      class="text-center py-12"
    >
      <p class="text-red-600 mb-4 text-16">
        {{ newsStore.error }}
      </p>
      <button
        class="px-6 py-2 bg-purple text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
        @click="newsStore.loadNews()"
      >
        Try Again
      </button>
    </div>

    <div
      v-else-if="newsStore.news.length === 0"
      class="text-center py-12"
    >
      <p class="text-gray-600">
        No news available
      </p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[40px]">
        <NewsCard
          v-for="item in newsStore.news"
          :key="item.id"
          :news="item"
        />
      </div>

      <!-- Scroll trigger element -->
      <div
        ref="scrollTrigger"
        class="flex items-center justify-center"
      >
        <div
          v-if="newsStore.loadingMore"
          class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-100 border-b-purple"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import NewsCard from '@/components/news/NewsCard.vue';
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore();
const scrollTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

onMounted(async () => {
  if (newsStore.news.length === 0) {
    await newsStore.loadNews();
  }

  observer = new IntersectionObserver((entries) => {
    const [entry] = entries;

    if (entry?.isIntersecting && newsStore.hasMore && !newsStore.loadingMore) {
      newsStore.loadNews(false);
    }
  }, {
    rootMargin: '100px',
  });

  if (scrollTrigger.value) {
    observer.observe(scrollTrigger.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
