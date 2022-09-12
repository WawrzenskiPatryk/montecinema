<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '@/store/index.js';
import {
  getTodaysDateObject,
  getFormattedDateObject,
  weekdayShortNames,
} from '@/services/dates.js';

import BaseSelect from '@/components/base/BaseSelect.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import ScreeningsList from '@/components/screenings/ScreeningsList.vue';
import CalendarIcon from '@/assets/icons/calendar.svg';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';

export default defineComponent({
  components: {
    BaseSelect,
    BaseHeading,
    BaseButton,
    ScreeningsList,
    CalendarIcon,
    DatePicker,
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
      datepickerDate: null,
      displayDate: '',
      displayWeekday: '',
      weekdayNames: weekdayShortNames,
    };
  },
  beforeMount() {
    const { apiDate, displayDate, weekday } = this.dateObject;
    this.loadFilteredScreenings(apiDate);
    this.updateDateState(apiDate, displayDate, weekday);
  },
  computed: {
    ...mapState(useMainStore, ['areScreeningsLoading', 'storedScreenings', 'allMovies']),

    displayedScreenings() {
      if (this.movieId) {
        return this.storedScreenings.filter(screening => screening.id == this.movieId);
      } else {
        return this.storedScreenings;
      }
    },
    dateObject() {
      return getTodaysDateObject();
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
    ...mapActions(useMainStore, ['loadScreenings']),

    loadFilteredScreenings(date) {
      const movieId = this.movieFilterValue == 0 ? null : this.movieFilterValue;
      this.loadScreenings(movieId, date);
    },

    updateDateState(apiDate, displayDate, displayWeekday) {
      this.apiDate = apiDate;
      this.datepickerDate = apiDate;
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
    datepickerDate(value) {
      const pickedDateInstance = new Date(value);
      const { apiDate, displayDate, weekday } = getFormattedDateObject(pickedDateInstance);
      this.loadFilteredScreenings(apiDate);
      this.updateDateState(apiDate, displayDate, weekday);
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
              <CalendarIcon class="screenings-panel__calendar-icon" />
              <date-picker
                format="yyyy-mm-dd"
                autoApply
                hideInputIcon
                closeOnScroll
                :minDate="new Date()"
                :enableTimePicker="false"
                :transitions="false"
                :dayNames="weekdayNames"
                v-model="datepickerDate"
                class="screenings-panel__datepicker"
              >
                <template #trigger>
                  <button class="screenings-panel__datepicker-trigger-button"></button>
                </template>
              </date-picker>
            </BaseButton>
          </div>
        </div>
        <BaseSelect
          v-if="!hasMovieId"
          v-model="movieFilterValue"
          :clearable="false"
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
        <BaseHeading heading-size="small">
          No seances found. Please pick another date.
        </BaseHeading>
      </div>
      <ScreeningsList v-else :screenings="displayedScreenings" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
// TODO: MOBILE VIEW
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
    &:nth-last-child(2),
    &:nth-last-child(3) {
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

  &__calendar-icon {
    position: absolute;
  }

  &__datepicker-trigger-button {
    height: 5.2rem;
    width: 5.2rem;
    border-radius: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
