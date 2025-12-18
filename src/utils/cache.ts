export interface CacheData<T> {
  data: T;
  timestamp: number;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export const storage = {
  get<T>(key: string, ttl = DEFAULT_TTL): T | null {
    const cached = localStorage.getItem(key);

    if (!cached) {return null;}

    try {
      const { data, timestamp }: CacheData<T> = JSON.parse(cached);

      if (Date.now() - timestamp > ttl) {
        localStorage.removeItem(key);

        return null;
      }

      return data;
    } catch {
      return null;
    }
  },

  set<T>(key: string, data: T): void {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(cacheData));
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

