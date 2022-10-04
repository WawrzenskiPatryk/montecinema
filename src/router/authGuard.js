import { useAuthStore } from '@/store/auth.ts';

export const authGuard = (to, _, next) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn && to.meta.requiresUnauthorized) {
    next({ name: 'UserAccountPage' });
  } else if (!isLoggedIn && to.meta.requiresAuth) {
    next({ name: 'LoginPage', query: { redirect: to.name } });
  } else {
    next();
  }
};
