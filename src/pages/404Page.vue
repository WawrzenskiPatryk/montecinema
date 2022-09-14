<script>
import { defineComponent } from 'vue';
import { useMeta } from 'vue-meta';

export default defineComponent({
  setup() {
    useMeta({ title: '404: Not Found' });
  },
});
</script>

<template>
  <h1>Sorry, something went wrong...</h1>
  <router-link :to="{ name: 'HomePage' }" replace>Go to home page</router-link>
</template>
