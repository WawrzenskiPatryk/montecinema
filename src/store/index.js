import { defineStore } from 'pinia';
import { getAllMoviesData, getMovieGenresData, getSeancesData } from '@/services/api/data.js';
import router from '@/router';

export const useMainStore = defineStore('main', {
  state() {
    return {
      error: null,
      errorDisplayTime: 4,
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
    storeErrorToDisplay(error, errorTime = this.errorDisplayTime) {
      this.error = error;
      this.errorDisplayTime = errorTime;
      if (errorTime !== Infinity) {
        setTimeout(() => {
          this.error = null;
        }, this.errorDisplayTime * 1000);
      }
    },

    showError(error, errorTime) {
      if (error.message === 'Network Error') {
        this.storeErrorToDisplay(new Error('CONNECTION TO SERVER LOST'), Infinity);
      } else {
        this.storeErrorToDisplay(error, errorTime);
      }
    },

    async loadAllMovies() {
      this.areMoviesLoading = true;
      try {
        this.allMovies = await getAllMoviesData();
      } catch (error) {
        this.showError(error);
      } finally {
        this.areMoviesLoading = false;
      }
    },

    async loadAllGenres() {
      this.areGenresLoading = true;
      try {
        this.allGenres = await getMovieGenresData();
      } catch (error) {
        this.showError(error);
      } finally {
        this.areGenresLoading = false;
      }
    },

    async loadSeancesByDate(movieId, date) {
      this.areSeancesLoading = true;
      try {
        this.storedSeances = await getSeancesData(movieId, date);
      } catch (error) {
        this.showError(error);
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
        const currentSeance = {
          id: seance.id,
          datetime: seance.datetime,
        };

        const screeningIndex = screenings.findIndex(screening => screening.id === seance.movie);

        if (screeningIndex < 0) {
          const matchingMovieToSeance = movies.find(movie => movie.id === seance.movie);
          const newScreening = {
            ...matchingMovieToSeance,
            seances: [currentSeance],
          };
          screenings.push(newScreening);
        } else {
          screenings[screeningIndex].seances.push(currentSeance);
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

    leaveRoute(destinationName = null) {
      const routeQuery = router.currentRoute.value.query;
      if (destinationName) {
        router.push({ name: destinationName });
      } else if (routeQuery.redirect) {
        router.push({ name: routeQuery.redirect });
      } else {
        router.push({ name: 'HomePage' });
      }
    },
  },
});
