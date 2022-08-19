<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

export default defineComponent({
  components: {
    TheHeader,
    TheBreadcrumb,
  },
  computed: {
    is404() {
      return this.$route.name === '404Page';
    },
    isHomePage() {
      return this.$route.name === 'HomePage';
    },
    isBreadcrumbVisible() {
      return !(this.isHomePage || this.is404);
    },
  },
});
</script>

<template>
  <div class="app">
    <TheHeader class="app__header" />
    <main class="app__content">
      <TheBreadcrumb v-if="isBreadcrumbVisible" class="app__breadcrumb" />
      <router-view />
    </main>
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
