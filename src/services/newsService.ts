import mockNews from '@/data/mockNews.json';
import type { NewsItem, NewsResponse } from '@/types/news';

export async function fetchNews(page = 1, limit = 6): Promise<NewsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const start = (page - 1) * limit;
  const end = start + limit;

  const items = mockNews.slice(start, end).map(({ content, ...rest }) => ({
    ...rest,
  })) as NewsItem[];

  return {
    items,
    total: mockNews.length,
    hasMore: end < mockNews.length,
  };
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const newsItem = mockNews.find((item) => item.id === id) as NewsItem | undefined;

  return newsItem || null;
}
