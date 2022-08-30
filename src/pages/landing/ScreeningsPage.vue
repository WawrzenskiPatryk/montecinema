<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { getDateObject } from '@/services/dates.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    BaseSelect,
    BaseHeading,
  },
  data() {
    return {
      movieFilterValue: 0,
      pickedDate: null,
      // pickedDate: '11 feb 2022',
    };
  },
  beforeMount() {
    this.loadFilteredScreenings();
  },
  computed: {
    ...mapState(mainStore, ['areScreeningsLoading', 'storedScreenings', 'allMovies']),

    currentDateObject() {
      return getDateObject(this.pickedDate);
    },
    hyphenFormattedDate() {
      const { year, month, day } = this.currentDateObject;
      return `${year}-${month}-${day}`;
    },
    titleFormattedDate() {
      const { year, month, day, weekday } = this.currentDateObject;
      return `${weekday} ${day}/${month}/${year}`;
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
      <BaseHeading class="screenings-page__title u-heading">
        <span class="screenings-page__title--dark"> Screenings: </span>
        <span class="screenings-page__title--light"> {{ titleFormattedDate }} </span>
      </BaseHeading>

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

    <ul v-if="!areScreeningsLoading">
      <li v-for="screening in storedScreenings" :key="screening.id">
        {{ screening }}
        <br /><br />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.screenings-page {
  @include page-padding;

  &__title {
    display: flex;
    flex-direction: column;
    margin: 3.2rem 0;

    &--light {
      color: $gray-bombay;
    }
  }
}
</style>
