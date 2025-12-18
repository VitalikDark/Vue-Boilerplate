<template>
  <div class="mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-[215px] py-8 pt-12 pb-18">
    <nav
      v-if="newsItem"
      class="mb-10 flex items-center gap-2 text-12 font-normal"
      aria-label="Breadcrumb"
    >
      <router-link
        to="/"
        class="text-purple hover:opacity-80 transition-colors"
      >
        Last news
      </router-link>
      <span class="text-gray-400">/</span>
      <span class="text-gray-500 line-clamp-1">News details</span>
    </nav>

    <div
      v-if="loading"
      class="text-center py-12"
    >
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-b-purple"></div>
      <p class="mt-4 text-light-gray-200 text-16">
        Loading...
      </p>
    </div>

    <div
      v-else-if="!newsItem"
      class="text-center py-12"
    >
      <p class="text-gray-600 mb-4 text-16">
        News not found
      </p>
      <button
        class="px-6 py-2 bg-purple text-white rounded-lg hover:opacity-90 transition-opacity font-bold"
        @click="$router.push('/')"
      >
        Go to News List
      </button>
    </div>

    <article
      v-else
      class="mx-auto"
    >
      <div class="bg-white overflow-hidden">
        <div 
          class="relative w-full overflow-hidden rounded-2xl bg-gray-100 h-[333px]"
        >
          <img
            :src="newsItem.image"
            :alt="newsItem.title"
            class="absolute inset-0 w-full h-full"
            style="object-fit: cover; object-position: center;"
            loading="lazy"
            decoding="async"
          >
        </div>
        <div class="pt-4">
          <h1 class="text-28 font-bold text-black mb-4">
            {{ newsItem.title }}
          </h1>
          <NewsMeta
            :publication-date="newsItem.publicationDate"
            :author="newsItem.author"
            class="pb-8"
          />
          <div class="prose max-w-none">
            <template
              v-for="(block, index) in processedContent"
              :key="index"
            >
              <blockquote
                v-if="block.isQuote"
                class="border-l-4 border-purple pl-4 my-6 italic text-black font-bold text-16"
              >
                {{ block.text }}
              </blockquote>
              <p
                v-else
                class="text-black text-16 leading-relaxed mb-6"
              >
                {{ block.text }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import NewsMeta from '@/components/news/NewsMeta.vue';
import { useNewsStore } from '@/stores/newsStore';
import type { NewsItem } from '@/types/news';

const route = useRoute();
const newsStore = useNewsStore();

const newsItem = ref<NewsItem | null>(null);
const loading = ref(true);

const newsId = computed(() => route.params.id as string);

const processedContent = computed(() => {
  const content = newsItem.value?.content;

  if (!content) {
    return [];
  }

  return content.split('\n\n').filter(block => block.trim()).map((block) => {
    const trimmedBlock = block.trim();
    const isQuote = trimmedBlock.startsWith('>');

    return {
      text: isQuote ? trimmedBlock.slice(1).trim() : trimmedBlock,
      isQuote,
    };
  });
});

onMounted(async () => {
  loading.value = true;
  newsItem.value = await newsStore.getNewsItem(newsId.value);
  loading.value = false;
});
</script>
