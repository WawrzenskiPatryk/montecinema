<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    movieData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedMovieLength() {
      if (!this.movieData) return '0h 0 min';
      const allMinutes = this.movieData.length;
      const hours = Math.floor(allMinutes / 60);
      const minutes = allMinutes - hours * 60;
      if (minutes === 0) return `${hours}h`;
      if (minutes < 10) return `${hours}h 0${minutes} min`;
      return `${hours}h ${minutes} min`;
    },
  },
});
</script>

<template>
  <router-link :to="`/movies/${movieData.title}`" class="movie-card">
    <div class="movie-card__top-wrapper">
      <h2 class="movie-card__title">{{ movieData.title }}</h2>
      <span class="movie-card__length">{{ formattedMovieLength }}</span>
    </div>
    <img :src="movieData.poster_url" :alt="movieData.title" class="movie-card__image" />
    <!-- <span>{{ movieData.genre.name }}</span> -->
  </router-link>
</template>

<style lang="scss" scoped></style>
