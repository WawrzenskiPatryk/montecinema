<script>
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    hasChildRoutes() {
      return this.$route.matched.length > 1;
    },
  },
});
</script>

<template>
  <main v-if="!hasChildRoutes" class="movies-page">
    <h1>Movies Page</h1>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 1 } }">Movie 1</router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 2 } }">Movie 2</router-link>
    <router-link :to="{ name: 'MovieDetailPage', params: { movieId: 3 } }">Movie 3</router-link>
  </main>
  <main v-else class="movies-page">
    <router-view />
    <router-link :to="{ name: 'MoviesPage' }">Go back</router-link>
  </main>
</template>

<style lang="scss" scoped>
.movies-page {
  display: flex;
  flex-direction: column;
}
</style>
