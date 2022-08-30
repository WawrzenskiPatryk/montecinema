<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { getDateObject } from '@/services/dates.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    BaseSelect,
  },
  data() {
    return {
      movieFilterValue: 0,
      pickedDate: null,
    };
  },
  beforeMount() {
    this.loadFilteredScreenings();
  },
  computed: {
    ...mapState(mainStore, ['areScreeningsLoading', 'storedScreenings', 'allMovies']),

    hyphenFormattedDate() {
      const { year, month, day } = this.currentDateObject;
      return `${year}-${month}-${day}`;
    },

    titleFormattedDate() {
      const { year, month, day, weekday } = this.currentDateObject;
      return `${weekday} ${day}/${month}/${year}`;
    },

    currentDateObject() {
      return getDateObject(this.pickedDate);
    },

    movieOptions() {
      const defaultOption = { id: 0, name: 'All movies' };
      const options = [defaultOption];
      for (const movie of this.allMovies) {
        options.push({ id: movie.id, name: movie.title });
      }
      return options;
    },
  },
  methods: {
    ...mapActions(mainStore, ['loadScreenings']),

    loadFilteredScreenings() {
      const movieId = this.movieFilterValue == 0 ? null : this.movieFilterValue;
      this.loadScreenings(movieId, this.hyphenFormattedDate);
    },
  },
  watch: {
    movieFilterValue() {
      this.loadFilteredScreenings();
    },
  },
});
</script>

<template>
  <TheBreadcrumb />
  <section class="screenings-page">
    <div class="screenings-page__items">
      <h1 class="screenings-page__title">
        <span class="screenings-page__title--dark"> Screenings: </span>
        <span class="screenings-page__title--light"> {{ titleFormattedDate }} </span>
      </h1>

      <div class="screenings-page__filter-inputs">
        <!-- todo: radio select for date with calendar dropdown -->
        <div class="screenings-page__date-select"></div>
        <!-- todo ------------------------------------------------>
        <BaseSelect
          v-model="movieFilterValue"
          label="Movie"
          :options="movieOptions"
          class="screenings-page__movie-select"
        />
      </div>
    </div>

    <h1>Screenings Page</h1>
    <ul v-if="!areScreeningsLoading">
      <li v-for="screening in storedScreenings" :key="screening.id">
        {{ screening }}
        <br /><br />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped></style>
