export default [
  {
    path: '',
    name: 'HomePage',
    component: () => import('@/pages/public/HomePage.vue'),
  },
  {
    path: '/movies',
    name: 'MoviesPage',
    children: [
      {
        path: '',
        name: 'MoviesListPage',
        component: () => import('@/pages/public/MoviesPage.vue'),
      },
      {
        path: ':movieId',
        name: 'MovieDetailPage',
        component: () => import('@/pages/public/movies/MovieDetailPage.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/screenings',
    name: 'ScreeningsPage',
    component: () => import('@/pages/public/ScreeningsPage.vue'),
  },
  {
    path: '/contact-us',
    name: 'ContactPage',
    component: () => import('@/pages/public/ContactPage.vue'),
  },
];
