<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';

import { getUserData } from '@/services/api.js'; // <<< for testing only

import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  created() {
    this.auth.restoreAuth();
  },
  methods: {
    // for testing only >>>>
    async getSecretData() {
      this.user = await getUserData();
      console.table(this.user);
    },
    // <<<
  },
});
</script>

<template>
  <div class="app">
    <TheHeader class="app__header" />
    <!-- for testing only -->
    <button @click="getSecretData">Get secret data</button>
    <!---------------------->
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
