<script>
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { mainStore } from '@/store/index.js';

import BaseTag from '@/components/base/BaseTag.vue';

export default defineComponent({
  components: {
    BaseTag,
  },
  props: {
    screeningData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedMovieLength() {
      return this.formatMovieLength(this.screeningData.length);
    },
  },
  methods: {
    ...mapActions(mainStore, ['formatMovieLength']),
  },
});
</script>

<template>
  <li class="screenings-list-card">
    <div class="screenings-list-card__image-container">
      <img
        :src="screeningData.poster_url"
        :alt="screeningData.title"
        class="screenings-list-card__image"
      />
    </div>
    <div class="screenings-list-card__info">
      <h4 class="screenings-list-card__title">
        {{ screeningData.title }}
      </h4>
      <div class="screenings-list-card__details">
        <BaseTag class="screenings-list-card__genre">{{ screeningData.genre.name }}</BaseTag>
        <span class="screenings-list-card__length">{{ formattedMovieLength }}</span>
      </div>
      <!-- TODO: seances list -->
      <ul class="screenings-list-card__seances">
        <li v-for="seance in screeningData.seances" :key="seance.id">
          <router-link :to="'#'"> {{ seance.datetime }} </router-link>
        </li>
      </ul>
      <!-- TODO -->
    </div>
  </li>
</template>

<style lang="scss" scoped>
.screenings-list-card {
  display: flex;
  padding: 4rem;
  gap: 4rem;

  width: 100%;
  border-radius: 0.8rem;
  box-shadow: $shadow-movie-card;
  background-color: $white;

  &__image-container {
    display: inline-block;
    width: 9.8rem;
    height: 13.2rem;
  }

  &__image {
    width: 9.8rem;
    height: 13.2rem;
    object-fit: cover;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin: 0;
    margin-bottom: 0.8rem;

    font-family: 'Roboto', sans-serif;
    font-weight: $font-weight-bold;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: $gray-tuna;
  }

  &__details {
    display: flex;
    align-items: center;
    gap: 1.6rem;
  }

  &__length {
    font-family: 'Roboto', sans-serif;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $gray-jumbo;
  }

  &__seances {
    // TODO
    display: flex;
    gap: 2rem;
    padding: 0;
    margin-top: auto;
    //
  }
}
</style>
