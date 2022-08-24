<script>
import { defineComponent } from 'vue';
import { getMovieData } from '@/services/api.js';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieDetail from '@/components/movies/MovieDetail.vue';

export default defineComponent({
  components: {
    MovieDetail,
    TheBreadcrumb,
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
      movieTitle: null,
    };
  },
  async mounted() {
    try {
      this.storedMovie = await getMovieData(this.movieId);
      this.movieTitle = this.storedMovie.title;
    } catch {
      this.$router.push({ name: '404Page' });
    } finally {
      if (this.storedMovie) this.isLoading = false;
    }
  },
});
</script>

<template>
  <TheBreadcrumb :second-item="movieTitle" />
  <section class="movie-detail-page">
    <div v-if="isLoading">Loading...</div>
    <MovieDetail v-else :movie="storedMovie" />
  </section>
</template>
