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
    path: '/movies/:movieId',
    name: 'MovieDetailPage',
    component: () => import('@/pages/movies/MovieDetailPage.vue'),
    props: true,
  },
  {
    path: '/screenings',
    name: 'ScreeningsPage',
    component: () => import('@/pages/ScreeningsPage.vue'),
  },
  {
    path: '/contact-us',
    name: 'ContactPage',
    component: () => import('@/pages/ContactPage.vue'),
  },
  {
    path: '/404',
    name: '404Page',
    component: () => import('@/pages/404Page.vue'),
  },
  {
    path: '/:path*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
