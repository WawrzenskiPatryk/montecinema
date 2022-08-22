<script>
import { defineComponent } from 'vue';
import HeroBanner from '@/components/home/HeroBanner.vue';
import MoviesPanel from '@/components/movies/MoviesPanel.vue';

export default defineComponent({
  components: {
    HeroBanner,
    MoviesPanel,
  },
});
</script>

<template>
  <HeroBanner />
  <MoviesPanel panelType="demo" />
</template>

<style lang="scss" scoped></style>
