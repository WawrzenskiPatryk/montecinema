<script>
import { defineComponent } from 'vue';
import { getMovieData } from '@/services/api/data.js';
import { mapState } from 'pinia';
import { mainStore } from '@/store/index.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieDetail from '@/components/movies/MovieDetail.vue';
import ScreeningsPanel from '@/components/screenings/ScreeningsPanel.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieDetail,
    ScreeningsPanel,
  },
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      storedMovie: null,
    };
  },
  mounted() {
    if (this.allMovies.length > 0) {
      this.findMovieInAllMovies();
    } else {
      this.loadSingleMovie();
    }
  },
  computed: {
    movieTitle() {
      return this.isLoading ? '' : this.storedMovie.title;
    },
    ...mapState(mainStore, ['allMovies', 'areMoviesLoading']),
  },
  methods: {
    findMovieInAllMovies() {
      const filteredMovie = this.allMovies.find(movie => movie.id == this.movieId);

      this.storedMovie = filteredMovie;
      this.isLoading = false;
    },

    async loadSingleMovie() {
      this.isLoading = true;
      try {
        this.storedMovie = await getMovieData(this.movieId);
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <TheBreadcrumb :second-item="movieTitle" />
  <section class="movie-detail-page">
    <div v-if="isLoading">Loading...</div>
    <MovieDetail v-else :movie="storedMovie" class="movie-detail-page__details" />
    <ScreeningsPanel
      heading-size="small"
      :movie-id="movieId"
      class="movie-detail-page__screenings"
    />
  </section>
</template>

<style lang="scss" scoped>
.movie-detail-page {
  &__details {
    margin-bottom: 6.4rem;
  }
}
</style>
