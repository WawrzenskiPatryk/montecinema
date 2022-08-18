<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    movieId: {
      type: String,
      required: true,
    },
  },
});
</script>

<template>
  <h1>MOVIE ID: {{ movieId }}</h1>
</template>
