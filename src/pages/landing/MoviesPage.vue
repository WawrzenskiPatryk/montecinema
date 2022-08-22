<script>
import { defineComponent } from 'vue';
import MoviesPanel from '@/components/movies/MoviesPanel.vue';

export default defineComponent({
  components: {
    MoviesPanel,
  },
});
</script>

<template>
  <section class="movies-page">
    <MoviesPanel />
  </section>
</template>

<style lang="scss" scoped>
.movies-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
