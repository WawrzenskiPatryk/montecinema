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
  <span>Movie ID: {{ movieId }}</span>
</template>
