export default [
  {
    path: '',
    redirect: '/auth/login',
  },
  {
    path: 'login',
    name: 'LoginPage',
    component: () => import('@/pages/auth/LoginPage.vue'),
    meta: {
      requiresUnauthorized: true,
    },
  },
  {
    path: 'register',
    name: 'RegisterPage',
    component: () => import('@/pages/auth/RegisterPage.vue'),
    meta: {
      requiresUnauthorized: true,
    },
  },
];
