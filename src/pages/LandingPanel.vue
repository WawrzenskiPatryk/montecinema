<script>
import { defineComponent } from 'vue';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
  },
});
</script>

<template>
  <main class="landing-panel">
    <TheBreadcrumb class="landing-panel__breadcrumb" />
    <router-view />
  </main>
</template>

<style lang="scss">
.landing-panel {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  min-height: calc(100vh + 1px);
}
</style>
