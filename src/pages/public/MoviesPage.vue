<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useMainStore } from '@/store/index.ts';
import { useMeta } from 'vue-meta';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieList from '@/components/movies/MovieList.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieList,
    BaseInput,
    BaseSelect,
    BaseHeading,
  },
  setup() {
    useMeta({ title: 'Movies' });
  },
  mounted() {
    if (this.allMovies.length === 0) this.loadAllMovies();
    if (this.allGenres.length === 0) this.loadAllGenres();
  },
  data() {
    return {
      searchFilterValue: '',
      categoryFilterValue: 0,
    };
  },
  computed: {
    ...mapState(useMainStore, ['allMovies', 'areMoviesLoading', 'allGenres', 'areGenresLoading']),

    categoryOptions() {
      const defaultOption = { id: 0, name: 'All categories' };
      return [defaultOption, ...this.allGenres];
    },

    displayedMovies() {
      const moviesFilteredByTitle = this.filterMoviesByName(this.allMovies, this.searchFilterValue);
      if (this.categoryFilterValue == 0) return moviesFilteredByTitle;
      return this.filterMoviesByGenre(moviesFilteredByTitle, this.categoryFilterValue);
    },
  },
  methods: {
    ...mapActions(useMainStore, ['loadAllMovies', 'loadAllGenres']),

    filterMoviesByName(movies, filterValue) {
      const filteredMovies = movies.filter(movie => {
        const allWhitespaces = /\s/g;
        const formattedTitle = movie.title.toLowerCase().replace(allWhitespaces, '');
        const formattedFilterValue = filterValue.toLowerCase().replace(allWhitespaces, '');
        return formattedTitle.includes(formattedFilterValue);
      });
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
      <BaseHeading class="movies-page__title" heading-size="large">All the movies</BaseHeading>

      <div class="movies-page__filter-inputs">
        <BaseInput
          v-model="searchFilterValue"
          label="Search"
          placeholder="What are you looking for?"
          type="search"
          class="movies-page__search-bar"
        />
        <BaseSelect
          v-model="categoryFilterValue"
          label="Category"
          :options="categoryOptions"
          class="movies-page__category-select"
        />
      </div>
    </div>

    <div class="movies-page__movies-list">
      <div v-if="areMoviesLoading">
        <h1>Loading...</h1>
      </div>
      <div v-else-if="displayedMovies.length === 0">
        <BaseHeading heading-size="small">
          No movies found. Please change your filtering settings.
        </BaseHeading>
      </div>
      <MovieList v-else :movies="displayedMovies" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  @include page-padding;

  &__items {
    margin-bottom: 3.2rem;

    @include screen-min-medium {
      margin-bottom: 6.4rem;
    }
  }

  &__title {
    margin: 3.2rem 0;
  }

  &__filter-inputs {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    @include screen-min-medium {
      flex-direction: row;
    }
  }

  @include screen-min-medium {
    &__search-bar {
      flex: 2.1;
    }
    &__category-select {
      flex: 1;
    }
  }
}
</style>
