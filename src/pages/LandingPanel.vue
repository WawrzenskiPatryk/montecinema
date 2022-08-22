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

<style lang="scss" scoped></style>
