<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { mainStore } from '@/store/index.js';

import MovieList from '@/components/movies/MovieList.vue';

export default defineComponent({
  components: {
    MovieList,
  },
  mounted() {
    if (this.allMovies.length === 0) {
      this.loadAllMovies();
    }
  },
  computed: {
    ...mapState(mainStore, ['allMovies', 'areMoviesLoading']),
  },
  methods: {
    ...mapActions(mainStore, ['loadAllMovies']),
  },
});
</script>

<template>
  <section class="movies-panel">
    <div class="movies-panel__heading">
      <h1 class="movies-panel__heading-title movies-panel__heading-title--mobile">Soon</h1>
      <h1 class="movies-panel__heading-title movies-panel__heading-title--desktop">
        Soon in the cinema
      </h1>
      <router-link :to="{ name: 'MoviesListPage' }" class="movies-panel__heading-link">
        See all
      </router-link>
    </div>

    <div v-if="areMoviesLoading">Loading...</div>
    <MovieList v-else :movies="allMovies.slice(0, 3)" />
  </section>
</template>

<style lang="scss" scoped>
.movies-panel {
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
  gap: 2.4rem;

  width: 100%;

  @include screen-min-medium {
    padding: 0;
  }

  &__heading {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2.4rem;
    min-width: 100%;
  }

  &__heading-title,
  &__heading-link {
    font-family: 'Roboto Mono', monospace;
    font-size: 2.2rem;
    font-weight: $font-weight-bold;
    line-height: 170%;
    letter-spacing: 0.015em;
    text-transform: uppercase;
  }

  &__heading-title {
    color: $gray-tuna;
    margin: 0;

    &--mobile {
      @include screen-min-medium {
        display: none;
      }
    }
    &--desktop {
      display: none;
      @include screen-min-medium {
        display: initial;
      }
    }
  }

  &__heading-link {
    color: $red-cherryred;
    text-decoration: none;

    @include hover {
      color: $red-totempole;
    }
    &:focus-visible,
    &:active {
      color: $red-totempole;
    }
  }
}
</style>
