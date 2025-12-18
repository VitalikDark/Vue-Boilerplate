import { createRouter, createWebHistory } from 'vue-router';

import NewsDetailView from '@/views/NewsDetailView.vue';
import NewsListView from '@/views/NewsListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: NewsListView,
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: NewsDetailView,
      props: true,
    },
  ],
});

export default router;
