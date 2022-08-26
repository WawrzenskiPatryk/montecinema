import { defineStore } from 'pinia';
import { getAllMoviesData, getMovieGenres } from '@/services/api.js';

export const mainStore = defineStore('main', {
  state() {
    return {
      areMoviesLoading: false,
      areGenresLoading: false,
      allMovies: [],
      allGenres: [],
    };
  },
  getters: {},
  actions: {
    async loadAllMovies() {
      this.areMoviesLoading = true;
      try {
        this.allMovies = await getAllMoviesData();
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.areMoviesLoading = false;
      }
    },
    async loadAllGenres() {
      this.areGenresLoading = true;
      try {
        this.allGenres = await getMovieGenres();
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.areGenresLoading = false;
      }
    },
  },
});
