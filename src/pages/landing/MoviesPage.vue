<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useMainStore } from '@/store/index.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieList from '@/components/movies/MovieList.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieList,
    BaseInput,
    BaseSelect,
  },
  mounted() {
    if (this.allMovies.length === 0) this.loadAllMovies();
  },
  data() {
    return {
      searchFilterValue: '',
      categoryFilterValue: 0,
      tempCategoryOptions: [
        { id: 1, name: 'Thriller' },
        { id: 2, name: 'Comedy' },
        { id: 3, name: 'Fantasy' },
        { id: 4, name: 'Sci-Fi' },
        { id: 5, name: 'Romance' },
        { id: 6, name: 'Family' },
        { id: 7, name: 'Horror' },
        { id: 8, name: 'Documentary' },
        { id: 9, name: 'Action' },
      ],
    };
  },
  computed: {
    ...mapState(useMainStore, ['allMovies', 'areMoviesLoading']),

    displayedCategoryOptions() {
      const defaultOption = { id: 0, name: 'All categories' };
      return [defaultOption, ...this.tempCategoryOptions];
    },
    displayedMovies() {
      const moviesFilteredByTitle = this.filterMoviesByName(this.allMovies, this.searchFilterValue);
      if (this.categoryFilterValue == 0) return moviesFilteredByTitle;
      return this.filterMoviesByGenre(moviesFilteredByTitle, this.categoryFilterValue);
    },
  },
  methods: {
    ...mapActions(useMainStore, ['loadAllMovies']),

    filterMoviesByName(movies, filterValue) {
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(filterValue.toLowerCase())
      );
      return filteredMovies;
    },

    filterMoviesByGenre(movies, filterValue) {
      const filteredMovies = movies.filter(movie => movie.genre.id == filterValue);
      return filteredMovies;
    },
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

      <BaseSelect
        v-model="categoryFilterValue"
        label="Category"
        :options="displayedCategoryOptions"
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
