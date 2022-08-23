<script>
import { defineComponent } from 'vue';

import MovieListCard from '@/components/movies/MovieListCard.vue';

export default defineComponent({
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  components: {
    MovieListCard,
  },
});
</script>

<template>
  <ul class="movie-list">
    <MovieListCard v-for="movieData in movies" :key="movieData.id" :movie-data="movieData" />
  </ul>
</template>

<style lang="scss" scoped>
.movie-list {
  display: grid;
  grid-gap: 4rem;

  @include screen-min-medium {
    grid-template-columns: repeat(2, 1fr);
  }
  @include screen-min-large {
    grid-template-columns: repeat(3, 1fr);
  }

  grid-auto-rows: minmax(10rem, auto);

  justify-items: center;
}
</style>
