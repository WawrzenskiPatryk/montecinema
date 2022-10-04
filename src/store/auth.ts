import { defineStore } from 'pinia';
import { login, register, setAuthHeader, removeAuthHeader } from '@/services/api/auth';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

const TOKEN_STORAGE_KEY = 'auth-token';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: null as string,
    };
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setAuthHeader(token);
    },
    resetToken() {
      this.token = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      removeAuthHeader();
    },
    async login(credentials: LoginCredentials) {
      const response = await login(credentials);
      const token = response.headers.authorization;
      this.setToken(token);
    },
    async register(credentials: RegisterCredentials) {
      const response = await register(credentials);
      const token = response.headers.authorization;
      this.setToken(token);
    },
    logout() {
      // TODO: logout in API
      this.resetToken();
    },
    restoreAuth() {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) this.setToken(token);
    },
  },
});
