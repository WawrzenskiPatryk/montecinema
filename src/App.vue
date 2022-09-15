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
    this.mainStore.showError(error);
  },
  computed: {
    isError() {
      return !!this.mainStore.error;
    },
    errorMessage() {
      return this.mainStore.error?.message || 'Sorry, unexpected error occured';
    },
    errorTime() {
      if (this.mainStore.errorDisplayTime === Infinity) {
        return 0;
      } else {
        return this.mainStore.errorDisplayTime + 's';
      }
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
    <div v-if="isError" class="app__error">
      <span class="app__error-info">{{ errorMessage }}</span>
      <button class="app__error-escape-button" @click="this.mainStore.error = null">X</button>
    </div>
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
  &__error {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: $red-cherryred;
    animation: error-message-animation ease;
    animation-duration: v-bind(errorTime);
  }
  &__error-info {
    display: block;
    margin: 0;
    padding: 1.6rem;
    text-align: center;
    color: $white;
  }
  &__error-escape-button {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    background-color: $red-cherryred;
    border: none;
    color: $white;
    cursor: pointer;
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
