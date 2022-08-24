<script>
import { defineComponent } from 'vue';
import { getMovieData } from '@/services/api.js';

export default defineComponent({
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
  async mounted() {
    try {
      this.storedMovie = await getMovieData(this.movieId);
    } catch {
      this.$router.push({ name: '404Page' });
    } finally {
      this.isLoading = false;
    }
  },
});
</script>

<template>
  <section class="movie-detail-page">
    <span>Movie ID: {{ movieId }}</span>
    <br />
    <span v-if="!isLoading">Movie Title: {{ storedMovie.title }}</span>
  </section>
</template>
