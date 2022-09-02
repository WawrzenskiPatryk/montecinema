<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { mainStore } from '@/store/index.js';
import { getDateObject } from '@/services/dates.js';

import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import ScreeningsList from '@/components/screenings/ScreeningsList.vue';
import CalendarIcon from '@/assets/icons/calendar.svg';

export default defineComponent({
  components: {
    BaseSelect,
    BaseHeading,
    BaseButton,
    ScreeningsList,
    CalendarIcon,
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
      apiDate: null,
      displayDate: '',
      displayWeekday: '',
    };
  },
  beforeMount() {
    const { apiDate, displayDate, weekday } = this.dateObject;
    this.loadFilteredScreenings(apiDate);
    this.updateDateState(apiDate, displayDate, weekday);
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
    dateObject() {
      return getDateObject();
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
      return this.movieId.trim();
    },
  },
  methods: {
    ...mapActions(mainStore, ['loadScreenings']),

    loadFilteredScreenings(date) {
      const movieId = this.movieFilterValue == 0 ? null : this.movieFilterValue;
      this.loadScreenings(movieId, date);
    },

    updateDateState(apiDate, displayDate, displayWeekday) {
      this.apiDate = apiDate;
      this.displayDate = displayDate;
      this.displayWeekday = displayWeekday;
    },
    getButtonType(date) {
      return this.apiDate === date.apiDate ? 'filled-dark' : 'hollow-dark';
    },
  },
  watch: {
    movieFilterValue() {
      this.loadFilteredScreenings(this.apiDate);
    },
    apiDate() {
      this.loadFilteredScreenings(this.apiDate);
    },
  },
});
</script>

<template>
  <section class="screenings-panel">
    <div class="screenings-panel__items">
      <BaseHeading class="screenings-panel__title" :heading-size="headingSize">
        <span class="screenings-panel__title--dark"> Screenings: </span>
        <span class="screenings-panel__title--light"> {{ displayWeekday }} {{ displayDate }} </span>
      </BaseHeading>

      <div class="screenings-panel__filter-inputs">
        <div class="screenings-panel__weekday-buttons-container">
          <span v-if="!hasMovieId" class="screenings-panel__weekday-buttons-label"> Day </span>
          <div class="screenings-panel__weekday-buttons">
            <BaseButton
              @click="
                updateDateState(dateObject.apiDate, dateObject.displayDate, dateObject.weekday)
              "
              :button-type="getButtonType(dateObject)"
              size="large"
              class="screenings-panel__weekday-button"
            >
              Today
            </BaseButton>

            <BaseButton
              v-for="day in dateObject.followingDays"
              :key="day.weekday"
              :button-type="getButtonType(day)"
              size="large"
              @click="updateDateState(day.apiDate, day.displayDate, day.weekday)"
              class="screenings-panel__weekday-button"
            >
              {{ day.shortWeekday }}
            </BaseButton>

            <BaseButton
              size="large"
              button-type="hollow-dark"
              class="screenings-panel__calendar-button"
            >
              <!-- TODO: Fully functional calendar component -->
              <CalendarIcon class="screenings-panel__calendar-icon" />
              <!-- TODO --------------------------------------->
            </BaseButton>
          </div>
        </div>
        <BaseSelect
          v-if="!hasMovieId"
          v-model="movieFilterValue"
          label="Movie"
          :options="movieOptions"
          class="screenings-panel__movie-select"
        />
      </div>
    </div>

    <div class="screenings-panel__screenings-list">
      <div
        v-if="areScreeningsLoading && displayedScreenings.length === 0"
        class="screenings-panel__loader"
      >
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

  &__weekday-buttons {
    flex: 5;
    display: flex;
    align-items: flex-end;
    gap: 0.8rem;
  }

  &__weekday-buttons-container {
    flex: 3;
    display: flex;
    flex-direction: column;
  }

  &__weekday-buttons-label {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    color: $red-bittersweet;
    margin-bottom: 1.2rem;
  }

  &__weekday-button {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      display: none;

      @include screen-min-large {
        display: initial;
      }
    }
  }

  &__calendar-button {
    width: 5.6rem;
    padding: 0;
    svg {
      stroke: currentColor;
    }
    @include hover {
      svg {
        stroke: currentColor;
      }
    }
  }
}
</style>
