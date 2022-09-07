import { defineStore } from 'pinia';
import { login, setAuthHeader } from '@/services/api.js';

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
    async login(credentials) {
      const response = await login(credentials);
      const token = response.headers.authorization;
      this.token = token;
      setAuthHeader(token);
    },
  },
});
