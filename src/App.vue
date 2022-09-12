<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
import { useMainStore } from '@/store/index.js';

import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const appTitle = import.meta.env.VITE_APP_TITLE;
    const auth = useAuthStore();
    const mainStore = useMainStore();
    return { auth, appTitle, mainStore };
  },
  created() {
    this.auth.restoreAuth();
  },
  errorCaptured(error) {
    if (error.message === 'AxiosError: Network Error') {
      const networkError = new Error('Connection to internet lost...');
      this.mainStore.storeErrorToDisplay(networkError, false);
    } else {
      this.mainStore.storeErrorToDisplay(error);
    }
  },
  computed: {
    isError() {
      return !!this.mainStore.error;
    },
    errorMessage() {
      return this.mainStore.error?.message || 'Sorry, unexpected error occured.';
    },
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
    <div v-if="isError" class="app__error">
      <span class="app__error-info">{{ errorMessage }}</span>
    </div>
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
  &__error {
    background-color: $red-cherryred;
    position: fixed;
    width: 100%;
    bottom: 0;
    animation: error-message-animation ease 4s forwards;
  }
  &__error-info {
    display: block;
    margin: 0;
    padding: 1.6rem;
    text-align: center;
    color: $white;
  }

  @keyframes error-message-animation {
    0% {
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
