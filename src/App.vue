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
    <TheHeader class="app__header" />
    <router-view class="app__content" />
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
