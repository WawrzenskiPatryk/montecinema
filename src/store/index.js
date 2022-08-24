import { defineStore } from 'pinia';
import { getAllMoviesData } from '@/services/api.js';

export const useMainStore = defineStore('main', {
  state() {
    return {
      areMoviesLoading: false,
      allMovies: [],
    };
  },
  getters: {
    // <-- computed ;)
  },
  actions: {
    async storeAllMovies() {
      this.areMoviesLoading = true;
      try {
        this.allMovies = await getAllMoviesData();
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.areMoviesLoading = false;
      }
    },
  },
});
