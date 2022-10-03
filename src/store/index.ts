import { defineStore } from 'pinia';
import { getAllMoviesData, getMovieGenresData, getSeancesData } from '@/services/api/data.js';
import { GenreData, MovieData, SeanceData, ScreeningData } from '@/types/data';
import router from '@/router';

export const useMainStore = defineStore('main', {
  state() {
    return {
      error: null as Error,
      errorDisplayTime: 4 as number,
      areMoviesLoading: false,
      areGenresLoading: false,
      areSeancesLoading: false,
      areScreeningsLoading: false,
      allMovies: [] as Array<MovieData>,
      allGenres: [] as Array<GenreData>,
      storedSeances: [] as Array<SeanceData>,
      storedScreenings: [] as Array<ScreeningData>,
    };
  },

  actions: {
    storeErrorToDisplay(error: Error, errorTime: number = this.errorDisplayTime) {
      if (this.error !== null) return;

      this.error = error;
      this.errorDisplayTime = errorTime;
      if (errorTime !== Infinity) {
        setTimeout(() => {
          this.error = null;
        }, this.errorDisplayTime * 1000);
      }
    },

    showError(error: Error, errorTime: number = this.errorDisplayTime) {
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

    async loadSeancesByDate(movieId: number | string, date: string) {
      this.areSeancesLoading = true;
      try {
        this.storedSeances = await getSeancesData(movieId, date);
      } catch (error) {
        this.showError(error);
      } finally {
        this.areSeancesLoading = false;
      }
    },

    async loadScreenings(movieId: number | string, date: string) {
      this.areScreeningsLoading = true;

      await this.loadSeancesByDate(movieId, date);
      if (this.allMovies.length === 0) {
        await this.loadAllMovies();
      }
      this.storedScreenings = this.matchSeancesToMovies(this.storedSeances, this.allMovies);

      this.areScreeningsLoading = false;
    },

    matchSeancesToMovies(
      seances: Array<SeanceData>,
      movies: Array<MovieData>
    ): Array<ScreeningData> {
      return seances.reduce((screenings: Array<ScreeningData>, seance: SeanceData) => {
        const screeningIndex = screenings.findIndex(screening => screening.id === seance.movie);
        if (screeningIndex < 0) {
          const matchingMovieToSeance = movies.find(movie => movie.id === seance.movie);
          const newScreening = {
            ...matchingMovieToSeance,
            seances: [seance],
          };
          screenings.push(newScreening);
        } else {
          screenings[screeningIndex].seances.push(seance);
        }
        return screenings;
      }, []);
    },

    formatMovieLength(movieLength: number) {
      if (!movieLength) return '0h 0 min';
      const allMinutes = movieLength;
      const hours = Math.floor(allMinutes / 60);
      const minutes = allMinutes - hours * 60;
      return `${hours}h ${minutes.toString().padStart(2, '0')} min`;
    },

    leaveRoute(destinationName: string = '') {
      const routeQuery = router.currentRoute.value.query;
      if (destinationName.length > 0) {
        router.push({ name: <string>destinationName });
      } else if (routeQuery.redirect) {
        router.push({ name: <string>routeQuery.redirect });
      } else {
        router.push({ name: 'HomePage' });
      }
    },
  },
});
