export default [
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('@/pages/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import('@/pages/auth/RegisterPage.vue'),
  },
];
