<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    headingSize: {
      type: String,
      required: true,
      validator(value) {
        return ['small', 'medium', 'large'].includes(value);
      },
    },
  },
  computed: {
    headingClass() {
      return `base-heading--${this.headingSize}`;
    },
  },
});
</script>

<template>
  <h1 class="base-heading" :class="headingClass">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.base-heading {
  font-family: 'Eczar', serif;
  font-weight: $font-weight-semibold;
  line-height: 102%;
  letter-spacing: -0.01em;
  color: $gray-tuna;
  margin: 0;

  &--small {
    font-size: 3.2rem;
  }
  &--medium,
  &--large {
    font-size: 4.8rem;
  }
  @include screen-min-medium {
    &--medium {
      font-size: 6.4rem;
    }
    &--large {
      font-size: 8rem;
    }
  }
}
</style>
