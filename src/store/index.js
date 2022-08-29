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

    formatMovieLength(movieLength) {
      if (!movieLength) return '0h 0 min';
      const allMinutes = movieLength;
      const hours = Math.floor(allMinutes / 60);
      const minutes = allMinutes - hours * 60;
      return `${hours}h ${minutes.toString().padStart(2, '0')} min`;
    },
  },
});
