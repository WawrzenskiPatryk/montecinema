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
  <label class="select u-form-label">
    {{ label }}
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="select__field u-form-field"
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
  </label>
</template>

<style lang="scss" scoped>
.select {
  position: relative;

  &__field {
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
