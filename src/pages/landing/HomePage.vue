<script>
import { defineComponent } from 'vue';
import HomeHeroBanner from '@/components/home/HomeHeroBanner.vue';
import HomeMoviesPanel from '@/components/home/HomeMoviesPanel.vue';

export default defineComponent({
  components: {
    HomeHeroBanner,
    HomeMoviesPanel,
  },
});
</script>

<template>
  <HomeHeroBanner />
  <HomeMoviesPanel />
</template>

<style lang="scss" scoped></style>
