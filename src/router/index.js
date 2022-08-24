import { createWebHistory, createRouter } from 'vue-router';

import landing from './landing';
import auth from './auth';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/LandingPanel.vue'),
    children: [
      ...landing,
      {
        path: '/404',
        name: '404Page',
        component: () => import('@/pages/404Page.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/pages/AuthPanel.vue'),
    children: [...auth],
  },
  {
    path: '/:path*',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
