<script setup lang="ts">
import { defineProps } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  theme?: 'gray' | 'red';
}>();

const themeClass = computed(() => {
  if (props.theme === 'red' || props.theme === undefined) {
    return `tag--red`;
  } else {
    return `tag--${props.theme}`;
  }
});
</script>

<template>
  <span class="tag" :class="themeClass">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.tag {
  font-weight: $font-weight-bold;
  font-size: 1.4rem;
  line-height: 1.6rem;

  width: fit-content;
  padding: 0.8rem 1.6rem;
  border-radius: 2.4rem;

  &--red {
    color: $red-bittersweet;
    background: $red-wisppink;
  }

  &--gray {
    color: $gray-jumbo;
    background: $gray-athensgray;
  }
}
</style>
