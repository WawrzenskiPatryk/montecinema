<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useMainStore } from '@/store/index.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieList from '@/components/movies/MovieList.vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieList,
    BaseInput,
  },
  mounted() {
    if (this.allMovies.length === 0) this.loadAllMovies();
  },
  data() {
    return {
      searchFilterValue: '',
      categoryFilterValue: '',
    };
  },
  computed: {
    ...mapState(useMainStore, ['allMovies', 'areMoviesLoading']),
    displayedMovies() {
      const moviesFilteredByTitle = this.allMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchFilterValue.toLowerCase())
      );
      // const moviesFilteredByGenre = moviesFilteredByTitle.filter(movie => movie.genre.id ???????);

      return moviesFilteredByTitle;
      // return moviesFilteredByGenre;
    },
  },
  methods: {
    ...mapActions(useMainStore, ['loadAllMovies']),
  },
});
</script>

<template>
  <TheBreadcrumb />
  <section class="movies-page">
    <div class="movies-page__items">
      <h1 class="movies-page__title">All the movies</h1>
      <BaseInput
        v-model="searchFilterValue"
        label="Search"
        placeholder="What are you looking for?"
        type="search"
      />
    </div>

    <div class="movies-page__movies-list">
      <div v-if="areMoviesLoading">Loading...</div>
      <MovieList v-else :movies="displayedMovies" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  padding: 0 2.4rem;

  &__items {
    margin-bottom: 3.2rem;
  }

  &__title {
    font-family: 'Eczar', serif;
    font-weight: $font-weight-semibold;
    font-size: 4.8rem;
    line-height: 102%;
    letter-spacing: -0.01em;
    color: $gray-tuna;

    margin: 3.2rem 0;
  }
}
</style>
