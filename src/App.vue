<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
});
</script>

<template>
  <div class="app">
    <TheHeader class="app__header"></TheHeader>
    <main class="app__content"></main>
  </div>
</template>

<style lang="scss">
.app {
  // TODO: max-width to be considered if is it wanted or not
  // max-width: 144rem;
  margin: 0 auto;

  &__header,
  &__content {
    @include screen-medium {
      padding: 0 4.8rem;
    }
  }
}
</style>
