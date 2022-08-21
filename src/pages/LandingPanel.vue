<script>
import { defineComponent } from 'vue';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

export default defineComponent({
  components: {
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
  <main class="landing-panel">
    <TheBreadcrumb v-if="isBreadcrumbVisible" class="landing-panel__breadcrumb" />
    <router-view />
  </main>
</template>

<style lang="scss" scoped></style>
