import { defineStore } from 'pinia';
import { getAllMoviesData, getMovieGenres, getSeancesData } from '@/services/api.js';

export const mainStore = defineStore('main', {
  state() {
    return {
      areMoviesLoading: false,
      areGenresLoading: false,
      areSeancesLoading: false,
      allMovies: [],
      allGenres: [],
      storedSeances: [],
      seancesDate: '2022-08-29',
    };
  },

  getters: {
    screenings() {
      if (this.allMovies.length === 0) this.loadAllMovies();
      this.loadSeancesByDate(this.seancesDate);

      const screeningsData = this.allMovies.map(movie =>
        this.createScreening(movie, this.storedSeances)
      );

      return screeningsData.filter(screening => screening !== null);
    },
  },

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

    async loadSeancesByDate(date) {
      this.areSeancesLoading = true;
      try {
        this.storedSeances = await getSeancesData(null, date);
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.areSeancesLoading = false;
      }
    },

    formatMovieLength(movieLength) {
      if (!movieLength) return '0h 0 min';
      const allMinutes = movieLength;
      const hours = Math.floor(allMinutes / 60);
      const minutes = allMinutes - hours * 60;
      return `${hours}h ${minutes.toString().padStart(2, '0')} min`;
    },

    createScreening(movie, seances) {
      const formattedMovieLength = this.formatMovieLength(movie.length);

      const screeningData = {
        id: movie.id,
        title: movie.title,
        genre: movie.genre,
        posterUrl: movie.poster_url,
        length: formattedMovieLength,
        seances: [],
      };

      seances.forEach(seance => {
        if (seance.movie === movie.id) screeningData.seances.push(seance);
      });

      if (screeningData.seances.length === 0) return null;
      else return screeningData;
    },
  },
});
