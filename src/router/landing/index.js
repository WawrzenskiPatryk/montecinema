export default [
  {
    path: '',
    name: 'HomePage',
    component: () => import('@/pages/landing/HomePage.vue'),
  },
  {
    path: '/movies',
    name: 'MoviesPage',
    component: () => import('@/pages/landing/MoviesPage.vue'),
  },
  {
    path: '/movies/:movieId',
    name: 'MovieDetailPage',
    component: () => import('@/pages/landing/movies/MovieDetailPage.vue'),
    props: true,
  },
  {
    path: '/screenings',
    name: 'ScreeningsPage',
    component: () => import('@/pages/landing/ScreeningsPage.vue'),
  },
  {
    path: '/contact-us',
    name: 'ContactPage',
    component: () => import('@/pages/landing/ContactPage.vue'),
  },
];
