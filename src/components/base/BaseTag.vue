<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    theme?: 'gray' | 'red';
  }>(),
  {
    theme: 'red',
  }
);
</script>

<template>
  <span class="tag" :class="`tag--${props.theme}`">
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
