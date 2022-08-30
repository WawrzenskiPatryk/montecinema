<script>
import { defineComponent } from 'vue';

import MovieListCard from '@/components/movies/MovieListCard.vue';

export default defineComponent({
  components: {
    MovieListCard,
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    movieCardClasses() {
      return {
        'movie-list__card': true,
        'movie-list__card--homepage-view': this.movies.length <= 3,
      };
    },
  },
});
</script>

<template>
  <ul class="movie-list">
    <MovieListCard
      v-for="movieData in movies"
      :key="movieData.id"
      :movie-data="movieData"
      :class="movieCardClasses"
    />
  </ul>
</template>

<style lang="scss" scoped>
.movie-list {
  display: grid;
  grid-gap: 2.4rem;
  justify-items: center;

  @include screen-min-medium {
    grid-gap: 4rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @include screen-min-large {
    grid-template-columns: repeat(3, 1fr);
  }

  &__card {
    &--homepage-view {
      &:last-child {
        @include screen-min-medium {
          display: none;
        }
        @include screen-min-large {
          display: initial;
        }
      }
    }
  }
}
</style>
