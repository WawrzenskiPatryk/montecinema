<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import HomePage from '@/pages/HomePage.vue';

export default defineComponent({
  components: {
    TheHeader,
    HomePage,
  },
});
</script>

<template>
  <div class="app">
    <TheHeader class="app__header"></TheHeader>
    <!-- will be <RouterView /> after implementing routing -->
    <HomePage class="app__content" />
    <!---->
  </div>
</template>

<style lang="scss">
.app {
  &__header,
  &__content {
    @include screen-min-medium {
      padding: $page-padding-regular;
    }
  }
}
</style>
