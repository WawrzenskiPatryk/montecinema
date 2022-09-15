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
  <div class="select">
    <label class="select__label">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select__field"
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
    <ArrowheadDown class="select__arrow-icon" />
  </div>
</template>

<style lang="scss" scoped>
.select {
  display: inline-block;
  position: relative;

  &__label {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    color: $red-bittersweet;
  }

  &__field {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;

    border: none;
    outline: none;

    width: 100%;
    margin-top: 1.2rem;
    padding: 0 2.4rem;
    height: 5.6rem;

    background-color: $gray-athensgray;
    border-radius: 0.8rem;

    font-family: 'Roboto', sans-serif;
    font-size: 1.8rem;
    line-height: 2.1rem;

    color: $gray-tuna;

    @include hover {
      background-color: $gray-basic;
    }
  }

  &__arrow-icon {
    position: absolute;
    top: 50%;
    right: 1.6rem;
    pointer-events: none;
  }
}
</style>
