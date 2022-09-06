<script>
import { defineComponent } from 'vue';
import HomeHeroBanner from '@/components/home/HomeHeroBanner.vue';
import HomeMoviesPanel from '@/components/home/HomeMoviesPanel.vue';
import ScreeningsPanel from '@/components/screenings/ScreeningsPanel.vue';
import HomeContactPanel from '@/components/home/HomeContactPanel.vue';

export default defineComponent({
  components: {
    HomeHeroBanner,
    HomeMoviesPanel,
    ScreeningsPanel,
    HomeContactPanel,
  },
});
</script>

<template>
  <HomeHeroBanner />
  <HomeMoviesPanel />
  <ScreeningsPanel heading-size="medium" />
  <HomeContactPanel />
</template>

<style lang="scss" scoped></style>
