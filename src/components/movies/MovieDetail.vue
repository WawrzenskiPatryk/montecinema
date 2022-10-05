<script>
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { useMainStore } from '@/store/index.ts';
import { movieImagePositioning } from '@/services/images.js';

import BaseTag from '@/components/base/BaseTag.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';

export default defineComponent({
  components: {
    BaseTag,
    BaseHeading,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageStyles() {
      return {
        'background-image': `url(${this.movie.poster_url})`,
        'background-position': movieImagePositioning[this.movie.id]
          ? movieImagePositioning[this.movie.id]
          : movieImagePositioning[0],
      };
    },
    movieReleaseYear() {
      const date = new Date(this.movie.release_date);
      return date.getFullYear();
    },
    formattedMovieLength() {
      return this.formatMovieLength(this.movie.length);
    },
  },
  methods: {
    ...mapActions(useMainStore, ['formatMovieLength']),
  },
});
</script>

<template>
  <div class="movie-detail">
    <div class="movie-detail__info-container">
      <BaseHeading heading-size="large" class="movie-detail__title">{{ movie.title }}</BaseHeading>

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
// TODO: MOBILE VIEW
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
    margin-bottom: 3.2rem;
  }

  &__details {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    gap: 1.6rem;

    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.6rem;

    color: $gray-jumbo;
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
