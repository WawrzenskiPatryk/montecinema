import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/movies',
    name: 'MoviesPage',
    component: () => import('@/pages/MoviesPage.vue'),
  },
  {
    path: '/screenings',
    name: 'ScreeningsPage',
    component: () => import('@/pages/ScreeningsPage.vue'),
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: () => import('@/pages/ContactPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
