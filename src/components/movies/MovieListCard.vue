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
      return `${hours}h ${minutes.toString().padStart(2, '0')} min`;
    },
  },
});
</script>

<template>
  <li class="movie-list-card">
    <router-link :to="`/movies/${movieData.id}`" class="movie-list-card__link">
      <h2 class="movie-list-card__title">{{ movieData.title }}</h2>
      <span class="movie-list-card__length">{{ formattedMovieLength }}</span>
      <img :src="movieData.poster_url" :alt="movieData.title" class="movie-list-card__image" />
      <span class="movie-list-card__genre">{{ movieData.genre.name }}</span>
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
.movie-list-card {
  box-shadow: $shadow-movie-card;
  border-radius: 0.8rem;

  width: 100%;
  max-width: 32.7rem;

  transition: transform 300ms ease;

  @include screen-min-medium {
    max-width: 42.1rem;
  }

  @include hover {
    transform: translateY(-0.5rem);
  }

  &__link {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;

    text-decoration: none;
    font-family: 'Roboto', sans-serif;

    padding: 2.4rem;

    @include screen-min-medium {
      padding: 4rem;
    }
  }

  &__title {
    margin: 0;
    font-weight: $font-weight-bold;
    font-size: 3.6rem;
    line-height: 4.2rem;
    color: $gray-tuna;

    margin-bottom: 0.8rem;
  }

  &__length {
    font-weight: $font-weight-medium;
    font-size: 1.4rem;
    line-height: 1.6rem;
    color: $gray-jumbo;

    margin-bottom: 1.6rem;
  }

  &__image {
    height: 15.7rem;
    object-fit: cover;

    margin-bottom: 2rem;
  }
}
</style>
