import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import MoviesPage from '@/pages/MoviesPage.vue';
import ScreeningsPage from '@/pages/ScreeningsPage.vue';
import ContactPage from '@/pages/ContactPage.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/movies',
    name: 'MoviesPage',
    component: MoviesPage,
  },
  {
    path: '/screenings',
    name: 'ScreeningsPage',
    component: ScreeningsPage,
  },
  {
    path: '/contact',
    name: 'ContactPage',
    component: ContactPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
