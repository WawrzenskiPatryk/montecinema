<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { getMovieData } from '@/services/api/data.js';
import { useMainStore } from '@/store/index.js';
import { useMeta } from 'vue-meta';

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
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { allMovies, showError } = useMainStore();
    const isLoading = ref(true);
    const storedMovie = ref(null);
    const movieTitle = computed(() => (isLoading.value ? '' : storedMovie.value.title));
    const setTitle = title => useMeta({ title: title });

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
        setTitle(movieTitle.value); // this works well
      } else {
        await loadSingleMovie();
      }
      // --- TODO: This is still giving problems in / after "else" scenario ---
      // setTitle(movieTitle.value); // >>> "Error: No manager or current instance"
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
