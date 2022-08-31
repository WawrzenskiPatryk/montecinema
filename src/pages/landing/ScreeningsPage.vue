<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { getDateObject } from '@/services/dates.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import ScreeningsList from '@/components/screenings/ScreeningsList.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    BaseSelect,
    BaseHeading,
    ScreeningsList,
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
        <div class="screenings-page__date-select">TODO: Date picker</div>
        <!-- todo ------------------------------------------------>
        <BaseSelect
          v-model="movieFilterValue"
          label="Movie"
          :options="movieOptions"
          class="screenings-page__movie-select"
        />
      </div>
    </div>

    <div class="screenings-page__screenings-list">
      <div v-if="areScreeningsLoading">
        <h1>Loading...</h1>
      </div>
      <div v-else-if="storedScreenings.length === 0">
        <h1>No seances found, pick another date.</h1>
      </div>
      <ScreeningsList v-else :screenings="storedScreenings" />
    </div>
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

  &__filter-inputs {
    display: flex;
    gap: 5vw;

    margin-bottom: 4.8rem;
    @include screen-min-medium {
      margin-bottom: 6.4rem;
    }
  }

  &__date-select {
    border: 1px dashed red;
    flex: 5;
  }

  &__movie-select {
    flex: 3;
  }
}
</style>
