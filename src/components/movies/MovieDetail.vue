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
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageStyles() {
      let backgroundPosition;

      if (this.movie.id === 1) backgroundPosition = '50% 30%';
      else if (this.movie.id === 2 || this.movie.id === 8) backgroundPosition = '50% 65%';
      else if (this.movie.id === 3) backgroundPosition = '50% 85%';
      else if (this.movie.id === 4) backgroundPosition = '50% 55%';
      else if (this.movie.id === 5) backgroundPosition = '50% 60%';
      else if (this.movie.id === 6 || this.movie.id === 9) backgroundPosition = '50% 15%';
      else if (this.movie.id === 7) backgroundPosition = '50% 93%';
      else if (this.movie.id === 10) backgroundPosition = '50% 45%';
      else if (this.movie.id === 11) backgroundPosition = '50% 25%';
      else backgroundPosition = '50% 50%';

      return {
        'background-image': `url(${this.movie.poster_url})`,
        'background-position': backgroundPosition,
      };
    },
    movieReleaseYear() {
      const indexOfFirstHyphen = this.movie.release_date.indexOf('-');
      return this.movie.release_date.slice(0, indexOfFirstHyphen);
    },
    formattedMovieLength() {
      return this.formatMovieLength(this.movie.length);
    },
  },
  methods: {
    ...mapActions(mainStore, ['formatMovieLength']),
  },
});
</script>

<template>
  <div class="movie-detail">
    <div class="movie-detail__info-container">
      <h1 class="movie-detail__title">{{ movie.title }}</h1>

      <div class="movie-detail__details">
        <BaseTag>{{ movie.genre.name }}</BaseTag>
        <span>{{ movieReleaseYear }}</span>
        <span>{{ formattedMovieLength }}</span>
      </div>

      <span class="movie-detail__description">
        {{ movie.description }}
      </span>
    </div>
    <div class="movie-detail__image-container" :style="imageStyles"></div>
  </div>
</template>

<style lang="scss" scoped>
.movie-detail {
  display: flex;
  flex-direction: row;
  gap: 3.2rem;

  &__info-container {
    width: 66%;
    @include screen-min-large {
      width: 55%;
    }
  }

  &__image-container {
    background-repeat: no-repeat;
    background-size: cover;

    width: 34%;
    @include screen-min-large {
      width: 45%;
    }
  }

  &__title {
    margin: 0;

    font-family: 'Eczar', serif;
    font-weight: $font-weight-semibold;
    font-size: 8rem;
    line-height: 102%;
    letter-spacing: -0.01em;

    color: $gray-tuna;
  }

  &__details {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 1.6rem;

    font-family: 'Roboto', sans-serif;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.6rem;

    color: $gray-jumbo;
  }

  &__title,
  &__details {
    margin-bottom: 3.2rem;
  }

  &__description {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-regular;
    font-size: 2.2rem;
    line-height: 170%;
    letter-spacing: 0.015em;

    color: $gray-tuna;
  }
}
</style>
