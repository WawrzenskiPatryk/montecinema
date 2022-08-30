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
      seancesDate: '2022-08-30',
    };
  },

  getters: {
    screenings() {
      // debugging logs are here for now because I've experieced
      // endless looping while calling the getter in some cases
      console.log('getter call start');
      //
      if (this.allMovies.length === 0) this.loadAllMovies();
      if (this.storedSeances.length === 0) this.loadSeancesByDate(this.seancesDate);

      const storedScreenings = this.storedSeances.reduce((screenings, seance) => {
        const screeningIndex = screenings.findIndex(movie => movie.id === seance.movie);

        if (screeningIndex < 0) {
          const matchingMovieToSeance = this.allMovies.find(movie => movie.id === seance.movie);
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
      //
      console.log('getter call end');
      //
      return storedScreenings;
    },

    testGetter() {
      console.log('wtf');
      return 'wtf';
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

    // setTodaysDate() {
    // const today = new Date();
    // const day = today.getDate();

    // console.log(day);

    // this.seancesDate = '';
    // },
  },
});
