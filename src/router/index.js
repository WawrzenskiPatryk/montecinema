import { createWebHistory, createRouter } from 'vue-router';
import { authGuard } from '@/router/authGuard.js';
import publicRoutes from './public';
import authRoutes from './auth';
import userRoutes from './user';

const routes = [
  {
    path: '/',
    component: () => import('@/pages/LandingPanel.vue'),
    children: [
      ...publicRoutes,
      ...userRoutes,
      {
        path: '/404',
        name: '404Page',
        component: () => import('@/pages/404Page.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/pages/AuthPanel.vue'),
    children: [...authRoutes],
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

router.beforeEach(authGuard);

export default router;
