<script>
import { defineComponent } from 'vue';
import VisibilityIcon from '../../assets/icons/eye.svg';

export default defineComponent({
  components: {
    VisibilityIcon,
  },
  props: {
    isPasswordVisible: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<template>
  <button
    class="password-visibility-button"
    :class="{ 'password-visibility-button--shown': isPasswordVisible }"
  >
    <VisibilityIcon />
  </button>
</template>

<style lang="scss" scoped>
.password-visibility-button {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  height: 3.2rem;
  padding: 0;
  cursor: pointer;

  background: none;
  border: none;
  border-radius: 100%;

  @include hover {
    background-color: $gray-basic;
  }

  svg {
    stroke: $gray-midgray;
  }

  &--shown {
    &::before {
      content: '';
      position: absolute;
      padding: 1.4rem 0;
      width: 0.15rem;
      border-radius: 1px;
      background-color: $gray-midgray;
      transform: translateY(0.5px) rotate(45deg);
    }
  }
}
</style>
