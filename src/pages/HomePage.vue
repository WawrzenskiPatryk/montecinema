<script>
import { defineComponent } from 'vue';
import HeroBanner from '@/components/home/HeroBanner.vue';

export default defineComponent({
  components: { HeroBanner },
});
</script>

<template>
  <main class="homepage">
    <HeroBanner class="homepage__hero-banner" />
  </main>
</template>

<style lang="scss" scoped></style>
