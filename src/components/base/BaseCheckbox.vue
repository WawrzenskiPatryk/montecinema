<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :required="required"
      class="checkbox__field"
    />
    <label class="checkbox__label">
      <slot>checkbox_label</slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  position: relative;

  &__label {
    user-select: none;
    padding-left: 3.6rem;

    &::before {
      content: '';
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 2.4rem;
      height: 2.4rem;
      background-color: $white;
      border: 0.75px solid $gray-bombay;
      border-radius: 0.8rem;
    }
  }

  &__field {
    position: absolute;
    width: 2.4rem;
    height: 2.4rem;
    opacity: 0;
  }

  @media (hover: hover) {
    &__field:hover + &__label::before {
      background-color: $gray-athensgray;
    }

    &__field:checked:hover + &__label::before {
      background-color: $gray-jumbo;
    }
  }

  &__field:focus-visible + &__label::before {
    background-color: $gray-athensgray;
    outline: $red-bittersweet solid 0.2rem;
  }

  &__field:checked + &__label::before {
    content: '\002714';
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $gray-midgray;
    border-color: $gray-midgray;
    color: $white;
    font-size: 2rem;
  }
}
</style>
