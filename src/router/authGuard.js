import { useAuthStore } from '@/store/auth.js';
import authRoutes from './auth';
import userRoutes from './user';

const getRouteNames = routes => {
  return routes.reduce((routeNames, route) => {
    if (route.name) routeNames.push(route.name);
    return routeNames;
  }, []);
};

export const authGuard = (to, _, next) => {
  const { isLoggedIn } = useAuthStore();
  const isAuthRoute = getRouteNames(authRoutes).includes(to.name);
  const isUserRoute = getRouteNames(userRoutes).includes(to.name);

  if (isLoggedIn && isAuthRoute) {
    next({ name: 'UserAccountPage' });
  } else if (!isLoggedIn && isUserRoute) {
    next({ name: 'LoginPage', query: { redirect: to.name } });
  } else {
    next();
  }
};
