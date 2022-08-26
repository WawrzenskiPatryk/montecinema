<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <label class="input-wrapper input-wrapper--label">
    {{ label }}
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="input-wrapper__input"
    />
  </label>
</template>

<style lang="scss" scoped>
.input-wrapper {
  display: inline-block;
  width: 100%;
  margin-bottom: 4rem;

  &--label {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    color: $red-bittersweet;
  }

  &__input {
    border: none;

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

    &::placeholder {
      color: $gray-jumbo;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
}
</style>
