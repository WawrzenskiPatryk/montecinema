<script>
import { defineComponent } from 'vue';
import { mapActions } from 'pinia';
import { mainStore } from '@/store/index.js';

import BaseTag from '@/components/base/BaseTag.vue';
import ScreeningsListSeance from '@/components/screenings/ScreeningsListSeance.vue';

export default defineComponent({
  components: {
    BaseTag,
    ScreeningsListSeance,
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

      <ul class="screenings-list-card__seances">
        <ScreeningsListSeance
          v-for="seance in screeningData.seances"
          :key="seance.id"
          :seance-data="seance"
        />
      </ul>
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
    overflow: hidden;
    @include screen-min-medium {
      overflow: initial;
    }
  }

  &__title {
    margin: 0;
    margin-bottom: 0.8rem;
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
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $gray-jumbo;
  }

  &__seances {
    display: flex;
    gap: 2rem;
    padding: 0;
    margin-top: auto;

    overflow-x: scroll;
    @include screen-min-medium {
      overflow-x: initial;
    }
    //
    // TODO:
    // Lines below cause scrollbar of the seances list to be not displayed due to designs.
    // It is to be considered if draggable horizontal scroll logic should be implemented
    // for non-touch devices. For now you can use [shift + scroll-wheel] to scroll list
    // horizontally or just use touchpad, but it has it's limitations, like devices
    // without touchpads or just user not knowing the combination with the shift key.
    //
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    // -------------------------------
  }
}
</style>
