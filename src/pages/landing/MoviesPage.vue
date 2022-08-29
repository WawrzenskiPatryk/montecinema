<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { mainStore } from '@/store/index.js';

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
    if (this.allGenres.length === 0) this.loadAllGenres();
  },
  data() {
    return {
      searchFilterValue: '',
      categoryFilterValue: 0,
    };
  },
  computed: {
    ...mapState(mainStore, ['allMovies', 'areMoviesLoading', 'allGenres', 'areGenresLoading']),

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
    ...mapActions(mainStore, ['loadAllMovies', 'loadAllGenres']),

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
      <h1 class="movies-page__title">All the movies</h1>

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
      <div v-if="areMoviesLoading">Loading...</div>
      <MovieList v-else :movies="displayedMovies" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  padding: 0 2.4rem;
  padding-bottom: 10.4rem;

  @include screen-min-medium {
    padding: 0;
    padding-bottom: 6.4rem;
  }

  &__items {
    margin-bottom: 3.2rem;

    @include screen-min-medium {
      margin-bottom: 6.4rem;
    }
  }

  &__title {
    font-family: 'Eczar', serif;
    font-weight: $font-weight-semibold;
    font-size: 4.8rem;
    line-height: 102%;
    letter-spacing: -0.01em;
    color: $gray-tuna;

    margin: 3.2rem 0;

    @include screen-min-medium {
      font-size: 8rem;
    }
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
