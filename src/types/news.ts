export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  publicationDate: string;
}

export interface NewsResponse {
  items: NewsItem[];
  total: number;
  hasMore: boolean;
}
