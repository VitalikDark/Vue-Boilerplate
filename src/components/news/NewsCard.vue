<template>
  <article
    class="bg-white overflow-hidden flex flex-col h-full cursor-pointer"
    @click="handleClick"
  >
    <div
      class="relative w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 h-60"
    >
      <img
        :src="news.image"
        :alt="news.title"
        class="absolute inset-0 w-full h-full"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="py-4 flex flex-col flex-1">
      <h2 class="text-purple text-22 font-bold line-clamp-2 mb-2 min-h-[44px]">
        {{ news.title }}
      </h2>
      <div class="flex-1 flex items-start min-h-[72px]">
        <p class="text-black text-base line-clamp-3">
          {{ news.description }}
        </p>
      </div>
      <NewsMeta
        :publication-date="news.publicationDate"
        :author="news.author"
        class="mt-auto pt-4"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import type { NewsItem } from '@/types/news';

import NewsMeta from './NewsMeta.vue';

interface Props {
  news: NewsItem;
}

const props = defineProps<Props>();

const router = useRouter();

function handleClick() {
  router.push(`/news/${props.news.id}`);
}
</script>
