<script>
import { defineComponent } from 'vue';

import ArrowheadDown from '@/assets/icons/arrowhead-down.svg';

export default defineComponent({
  components: { ArrowheadDown },
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <label class="select-wrapper select-wrapper--label">
    {{ label }}
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select-wrapper__select"
    >
      <option
        v-for="option in options"
        :value="option.id"
        :key="option.id"
        :selected="option === modelValue"
      >
        {{ option.name }}
      </option>
    </select>
    <ArrowheadDown class="select-wrapper__arrow-icon" />
  </label>
</template>

<style lang="scss" scoped>
.select-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;

  &--label {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    color: $red-bittersweet;
  }

  &__select {
    border: none;
    outline: none;

    width: 100%;
    margin-top: 1.2rem;
    padding: 0 2.4rem;
    height: 5.6rem;

    background-color: $gray-athensgray;
    border-radius: 0.8rem;

    font-family: 'Roboto', sans-serif;
    font-weight: $font-weight-regular;
    font-size: 1.8rem;
    line-height: 2.1rem;

    color: $gray-tuna;

    -webkit-appearance: none;
    appearance: none;
  }

  &__arrow-icon {
    position: absolute;
    top: 50%;
    right: 1.6rem;
  }
}
</style>
