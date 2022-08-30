<script>
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';

export default defineComponent({
  components: {
    BaseButton,
    BaseHeading
  },
});
</script>

<template>
  <section class="hero-banner">
    <div class="hero-banner__wrapper">
      <BaseHeading class="hero-banner__title">Welcome to the best cinema in Monterail</BaseHeading>
      <h2 class="hero-banner__subtitle">
        Best movies, best experiences, best people. And all that doesn’t exist. Yikes.
      </h2>
      <BaseButton size="large" class="hero-banner__button">Book a ticket</BaseButton>
    </div>
    <div class="hero-banner__image-container"></div>
  </section>
</template>

<style lang="scss" scoped>
.hero-banner {
  display: flex;

  margin-bottom: 6.4rem;

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: $padding-large;
    padding: $padding-large $padding-regular;
    height: calc(100vh - $header-height-small);
    max-height: 56.2rem;
    width: 100%;
    background-color: $red-wisppink;
  }

  &__title,
  &__subtitle {
    text-align: center;
    margin: 0;
    color: $gray-tuna;
  }

  &__subtitle {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-regular;
    font-size: 2.2rem;
    line-height: 170%;
    letter-spacing: 0.015em;
  }

  &__button {
    width: 100%;
  }

  &__image-container {
    display: none;
  }

  @include screen-min-medium {
    &__wrapper {
      align-items: flex-start;
      padding: 8rem;
      max-height: none;
      height: 61.8rem;
    }

    &__title,
    &__subtitle {
      text-align: left;
      max-width: 60rem;
    }

    &__button {
      width: initial;
    }
  }

  @include screen-min-large {
    &__wrapper {
      width: 66%;
    }

    &__image-container {
      width: 34%;
      display: initial;
      background: url('../../assets/images/hero-image.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
</style>
