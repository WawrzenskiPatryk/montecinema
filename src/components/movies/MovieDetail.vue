<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <div class="movie-detail">
    <div>Movie ID: {{ movie.id }}</div>
    <div>Movie title: {{ movie.title }}</div>
    <div>Movie genre.name: {{ movie.genre.name }}</div>
    <div>Movie poster_url: {{ movie.poster_url }}</div>
    <div>Movie length: {{ movie.length }}</div>
    <div>Movie release_date: {{ movie.release_date }}</div>
    <div>Movie description: {{ movie.description }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
