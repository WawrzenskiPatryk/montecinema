<script>
import { defineComponent } from 'vue';
import { getAllMoviesData } from '@/services/api.js';

export default defineComponent({
  data() {
    return {
      storedMovies: [],
    };
  },
  async mounted() {
    try {
      this.storedMovies = await getAllMoviesData();
    } catch {
      this.$router.push({ name: '404Page' });
    }
  },
});
</script>

<template>
  <section class="movies-page">
    <h1>Movies Page</h1>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie-1' } }">
      Movie 1
    </router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie-2' } }">
      Movie 2
    </router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie-3' } }">
      Movie 3
    </router-link>

    <div v-for="movie in storedMovies" :key="movie.id">
      <div>{{ movie.id }}</div>
      <div>{{ movie.title }}</div>
      <div>{{ movie.genre }}</div>
      <div>{{ movie.poster_url }}</div>
      <div>{{ movie.length }}</div>
      <div>{{ movie.release_date }}</div>
      <div>{{ movie.description }}</div>
      <br />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
