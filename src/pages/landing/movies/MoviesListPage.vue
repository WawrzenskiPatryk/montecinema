<script>
import { defineComponent } from 'vue';
import { getAllMoviesData } from '@/services/api.js';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

import MovieList from '@/components/movies/MovieList.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieList,
  },
  data() {
    return {
      isLoading: true,
      storedMovies: [],
    };
  },
  async mounted() {
    try {
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
  <TheBreadcrumb />
  <section class="movie-list-page">
    <div v-if="isLoading">Loading...</div>
    <MovieList v-else :movies="storedMovies" />
  </section>
</template>
