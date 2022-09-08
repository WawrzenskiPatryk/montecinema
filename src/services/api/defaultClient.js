import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/store/auth.js';

const API = import.meta.env.VITE_API;

const defaultClient = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
});

defaultClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const auth = useAuthStore();
      await auth.logout();
      router.push({ name: 'LoginPage' });
    }
    return Promise.reject(error);
  }
);

export default defaultClient;
