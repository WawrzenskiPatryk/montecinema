import { defineStore } from 'pinia';
import {
  login,
  register,
  updateUser,
  setAuthHeader,
  removeAuthHeader,
} from '@/services/api/auth.js';

const TOKEN_STORAGE_KEY = 'auth-token';

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: null,
    };
  },
  getters: {
    isLoggedIn: state => !!state.token,
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      setAuthHeader(token);
    },
    resetToken() {
      this.token = null;
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      removeAuthHeader();
    },
    async login(credentials) {
      const response = await login(credentials);
      const token = response.headers.authorization;
      this.setToken(token);
    },
    async register(credentials) {
      const response = await register(credentials);
      const token = response.headers.authorization;
      this.setToken(token);
    },
    async updateUser(credentials) {
      await updateUser(credentials);
      // const response = await updateUser(credentials);
      // const token = response.headers.authorization;
      // this.setToken(token);
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
