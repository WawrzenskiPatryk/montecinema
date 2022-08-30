import { defineStore } from 'pinia';
import { getAllMoviesData, getMovieGenres, getSeancesData } from '@/services/api.js';

export const mainStore = defineStore('main', {
  state() {
    return {
      areMoviesLoading: false,
      areGenresLoading: false,
      areSeancesLoading: false,
      areScreeningsLoading: false,
      allMovies: [],
      allGenres: [],
      storedSeances: [],
      storedScreenings: [],
    };
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

    async loadSeancesByDate(movieId, date) {
      this.areSeancesLoading = true;
      try {
        this.storedSeances = await getSeancesData(movieId, date);
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.areSeancesLoading = false;
      }
    },

    async loadScreenings(movieId, date) {
      this.areScreeningsLoading = true;

      await this.loadSeancesByDate(movieId, date);
      if (this.allMovies.length === 0) {
        await this.loadAllMovies();
      }
      this.storedScreenings = this.matchSeancesToMovies(this.storedSeances, this.allMovies);

      this.areScreeningsLoading = false;
    },

    matchSeancesToMovies(seances, movies) {
      const storedScreenings = seances.reduce((screenings, seance) => {
        const screeningIndex = screenings.findIndex(screening => screening.id === seance.movie);

        if (screeningIndex < 0) {
          const matchingMovieToSeance = movies.find(movie => movie.id === seance.movie);
          const newScreening = {
            ...matchingMovieToSeance,
            seances: [seance],
          };
          screenings.push(newScreening);
        } else {
          const matchedScreening = { ...screenings[screeningIndex] };
          matchedScreening.seances.push(seance);
          screenings.splice(screeningIndex, 1, matchedScreening);
        }

        return screenings;
      }, []);

      return storedScreenings;
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
