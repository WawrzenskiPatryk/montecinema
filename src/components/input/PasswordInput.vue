<script>
import { defineComponent, ref, computed } from 'vue';

import BaseInput from '@/components/base/BaseInput.vue';
import VisibilityIcon from '@/assets/icons/eye.svg';

export default defineComponent({
  components: {
    BaseInput,
    VisibilityIcon,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(_, context) {
    const isPasswordVisible = ref(false);

    const computedType = computed(() => {
      if (isPasswordVisible.value) return 'text';
      else return 'password';
    });

    const togglePasswordVisibility = () => (isPasswordVisible.value = !isPasswordVisible.value);

    const onUpdate = value => {
      context.emit('update:modelValue', value);
    };

    return {
      isPasswordVisible,
      computedType,
      togglePasswordVisibility,
      onUpdate,
    };
  },
});
</script>

<template>
  <BaseInput :model-value="modelValue" @update:model-value="onUpdate" :type="computedType">
    <button
      @click.prevent="togglePasswordVisibility"
      type="button"
      class="password-visibility-button"
      :class="{ 'password-visibility-button--shown': isPasswordVisible }"
      data-spec="password-button"
    >
      <VisibilityIcon />
    </button>
  </BaseInput>
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
