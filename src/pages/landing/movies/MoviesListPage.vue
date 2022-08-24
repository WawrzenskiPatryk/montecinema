<script>
import { defineComponent } from 'vue';
import { getAllMoviesData } from '@/services/api.js';

import MovieList from '@/components/movies/MovieList.vue';

export default defineComponent({
  components: {
    MovieList,
  },
  data() {
    return {
      isLoading: false,
      storedMovies: [],
    };
  },
  async mounted() {
    try {
      this.isLoading = true;
      this.storedMovies = await getAllMoviesData();
    } catch {
      this.$router.push({ name: '404Page' });
    } finally {
      this.isLoading = false;
    }
  },
});
</script>

<template>
  <section class="movie-list-page">
    <div v-if="isLoading">Loading...</div>
    <MovieList v-else :movies="storedMovies" />
  </section>
</template>
