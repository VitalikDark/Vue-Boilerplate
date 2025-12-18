import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchNews, fetchNewsById } from '@/services/newsService';
import type { NewsItem, NewsResponse } from '@/types/news';
import { storage } from '@/utils/cache';

const LIST_CACHE_KEY = 'news_list_cache_v2';
const DETAIL_CACHE_PREFIX = 'news_detail_v2_';

export const useNewsStore = defineStore('news', () => {
  const news = ref<NewsItem[]>([]);
  const loading = ref(false);
  const loadingMore = ref(false);
  const error = ref<string | null>(null);
  const page = ref(1);
  const hasMore = ref(true);

  const newsDetailsCache = ref<Record<string, NewsItem>>({});

  async function loadNews(isInitial = true) {
    if (isInitial) {
      if (news.value.length > 0) {return;}
      const cached = storage.get<NewsResponse>(LIST_CACHE_KEY);

      if (cached) {
        news.value = cached.items;
        hasMore.value = cached.hasMore;

        return;
      }

      loading.value = true;
      page.value = 1;
    } else {
      if (!hasMore.value || loadingMore.value) {return;}
      loadingMore.value = true;
    }

    error.value = null;
    try {
      const response = await fetchNews(page.value);
      
      if (isInitial) {
        news.value = response.items;
        storage.set(LIST_CACHE_KEY, response);
      } else {
        news.value = [...news.value, ...response.items];
      }
      
      hasMore.value = response.hasMore;
      page.value++;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load news';
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  }

  async function getNewsItem(id: string): Promise<NewsItem | null> {
    if (newsDetailsCache.value[id]) {
      return newsDetailsCache.value[id];
    }

    const existing = news.value.find(item => item.id === id);

    if (existing?.content) {
      newsDetailsCache.value[id] = existing;

      return existing;
    }

    const cacheKey = `${DETAIL_CACHE_PREFIX}${id}`;
    const cached = storage.get<NewsItem>(cacheKey);

    if (cached) {
      newsDetailsCache.value[id] = cached;

      return cached;
    }

    try {
      const item = await fetchNewsById(id);

      if (item) {
        newsDetailsCache.value[id] = item;
        storage.set(cacheKey, item);

        return item;
      }

      return null;
    } catch (err) {
      console.error('Failed to fetch news item:', err);

      return null;
    }
  }

  return {
    news,
    loading,
    loadingMore,
    error,
    hasMore,
    loadNews,
    getNewsItem,
  };
});
