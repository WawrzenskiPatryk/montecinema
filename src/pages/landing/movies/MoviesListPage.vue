<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useMainStore } from '@/store/index.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieList from '@/components/movies/MovieList.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieList,
  },
  mounted() {
    if (this.allMovies.length === 0) this.loadAllMovies();
  },
  computed: {
    ...mapState(useMainStore, ['allMovies', 'areMoviesLoading']),
  },
  methods: {
    ...mapActions(useMainStore, ['loadAllMovies']),
  },
});
</script>

<template>
  <TheBreadcrumb />
  <section class="movie-list-page">
    <div v-if="areMoviesLoading">Loading...</div>
    <MovieList v-else :movies="allMovies" />
  </section>
</template>
