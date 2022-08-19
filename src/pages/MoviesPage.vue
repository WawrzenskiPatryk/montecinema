<script>
import { defineComponent } from 'vue';
import { getAllMovies } from '@/services/apiServices.js';

export default defineComponent({
  data() {
    return {
      storedMovies: [],
    };
  },
  async mounted() {
    this.storedMovies = await getAllMovies();
  },
});
</script>

<template>
  <section class="movies-page">
    <h1>Movies Page</h1>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie1' } }">
      Movie 1
    </router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie2' } }">
      Movie 2
    </router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 'movie3' } }">
      Movie 3
    </router-link>

    {{ storedMovies }}
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
