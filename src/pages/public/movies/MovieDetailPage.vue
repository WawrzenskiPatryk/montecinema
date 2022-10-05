<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { getMovieData } from '@/services/api/data.js';
import { useMainStore } from '@/store/index';
import { useMeta } from 'vue-meta';
import { MovieData } from '@/types/data';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import MovieDetail from '@/components/movies/MovieDetail.vue';
import ScreeningsPanel from '@/components/screenings/ScreeningsPanel.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    MovieDetail,
    ScreeningsPanel,
  },
  props: {
    movieId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const { allMovies, showError } = useMainStore();
    const isLoading = ref(true);
    const storedMovie = ref<MovieData>(null);
    const movieTitle = computed((): string => (isLoading.value ? '' : storedMovie.value.title));

    const meta = computed(() => {
      return {
        title: isLoading.value ? '' : storedMovie.value.title,
      };
    });

    useMeta(meta);

    const findMovieInAllMovies = () => {
      const filteredMovie = allMovies.find(movie => movie.id == props.movieId);
      storedMovie.value = filteredMovie;
      isLoading.value = false;
    };

    const loadSingleMovie = async () => {
      isLoading.value = true;
      try {
        storedMovie.value = await getMovieData(props.movieId);
      } catch (error) {
        showError(error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      if (allMovies.length > 0) {
        findMovieInAllMovies();
      } else {
        await loadSingleMovie();
      }
    });

    return {
      isLoading,
      storedMovie,
      movieTitle,
    };
  },
});
</script>

<template>
  <TheBreadcrumb :second-item="movieTitle" />
  <section class="movie-detail-page">
    <div v-if="isLoading">Loading...</div>
    <MovieDetail v-else :movie="storedMovie" class="movie-detail-page__details" />
    <ScreeningsPanel
      heading-size="small"
      :movie-id="movieId"
      class="movie-detail-page__screenings"
    />
  </section>
</template>

<style lang="scss" scoped>
.movie-detail-page {
  &__details {
    margin-bottom: 6.4rem;
  }
}
</style>
