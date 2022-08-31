<script>
import { defineComponent } from 'vue';
import HomeHeroBanner from '@/components/home/HomeHeroBanner.vue';
import HomeMoviesPanel from '@/components/home/HomeMoviesPanel.vue';
import ScreeningsPanel from '@/components/screenings/ScreeningsPanel.vue';

export default defineComponent({
  components: {
    HomeHeroBanner,
    HomeMoviesPanel,
    ScreeningsPanel,
  },
});
</script>

<template>
  <HomeHeroBanner class="hero" />
  <HomeMoviesPanel class="movies" />
  <ScreeningsPanel heading-size="medium" class="screenings" />
</template>

<style lang="scss" scoped>
.hero {
  margin-bottom: 6.4rem;
}
.movies {
  margin-bottom: 8.8rem;
  @include screen-min-medium {
    margin-bottom: 6.4rem;
  }
}
.screenings {
  margin-bottom: 14.4rem;
  @include screen-min-medium {
    margin-bottom: 18.8rem;
  }
}
</style>
