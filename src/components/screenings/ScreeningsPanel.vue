<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { getDateObject } from '@/services/dates.js';

import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import ScreeningsList from '@/components/screenings/ScreeningsList.vue';

export default defineComponent({
  components: {
    BaseSelect,
    BaseHeading,
    ScreeningsList,
  },
  props: {
    movieId: {
      type: [String, Number],
      default: '',
    },
    headingSize: {
      type: String,
      default: 'large',
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      },
    },
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

    displayedScreenings() {
      if (this.movieId) {
        return this.storedScreenings.filter(screening => screening.id == this.movieId);
      } else {
        return this.storedScreenings;
      }
    },
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
    hasMovieId() {
      return !this.movieId.trim();
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
  <section class="screenings-panel">
    <div class="screenings-panel__items">
      <BaseHeading class="screenings-panel__title" :heading-size="headingSize">
        <span class="screenings-panel__title--dark"> Screenings: </span>
        <span class="screenings-panel__title--light"> {{ titleFormattedDate }} </span>
      </BaseHeading>

      <div class="screenings-panel__filter-inputs">
        <!-- todo: radio select for date with calendar dropdown -->
        <div class="screenings-panel__date-select">
          Today |
          <span v-for="day in currentDateObject.followingDays" :key="day.name">
            {{ day.name }} |
          </span>
        </div>
        <!-- todo ------------------------------------------------>
        <BaseSelect
          v-if="hasMovieId"
          v-model="movieFilterValue"
          label="Movie"
          :options="movieOptions"
          class="screenings-panel__movie-select"
        />
      </div>
    </div>

    <div class="screenings-panel__screenings-list">
      <div v-if="areScreeningsLoading">
        <h1>Loading...</h1>
      </div>
      <div v-else-if="displayedScreenings.length === 0">
        <h1>No seances found, pick another date.</h1>
      </div>
      <ScreeningsList v-else :screenings="displayedScreenings" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.screenings-panel {
  padding-bottom: 6.4rem;

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
