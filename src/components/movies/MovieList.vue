<script>
import { defineComponent } from 'vue';

// import MovieCard from '@/components/movies/MovieCard.vue';

export default defineComponent({
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  components: {
    // MovieCard,
  },
});
</script>

<template>
  <ul class="movie-list">
    <li class="movie-list__element" v-for="movieData in movies" :key="movieData.id">
      <!-- <MovieCard :movie-data="movieData" /> -->
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
