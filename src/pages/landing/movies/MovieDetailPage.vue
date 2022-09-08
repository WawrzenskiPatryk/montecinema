<script>
import { defineComponent } from 'vue';
import { getMovieData } from '@/services/api/data.js';
import { mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { useMeta } from 'vue-meta';

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
  setup() {
    // MovieDetailPage title should be dynamic, but we have some errors here
    // please check the comments below
    useMeta({ title: 'Movie Details' });
    //
  },
  data() {
    return {
      isLoading: true,
      storedMovie: null,
    };
  },
  async mounted() {
    if (this.allMovies.length > 0) {
      this.findMovieInAllMovies();
    } else {
      await this.loadSingleMovie();
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

      // This works:
      //
      // useMeta({ title: this.storedMovie.title });
      //
    },

    async loadSingleMovie() {
      this.isLoading = true;
      try {
        this.storedMovie = await getMovieData(this.movieId);
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.isLoading = false;

        // But this line throws error: No manager or current instance at useMeta
        //
        // useMeta({ title: this.storedMovie.title });
        //
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
