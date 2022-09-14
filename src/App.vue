<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';

import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const appTitle = import.meta.env.VITE_APP_TITLE;
    const auth = useAuthStore();
    return { auth, appTitle };
  },
  created() {
    this.auth.restoreAuth();
  },
});
</script>

<template>
  <metainfo>
    <template #title="{ content }">
      {{ content ? `${content} | ${appTitle}` : `${appTitle}` }}
    </template>
  </metainfo>
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
