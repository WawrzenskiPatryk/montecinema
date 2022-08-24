<script>
import { defineComponent } from 'vue';
import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
  },
});
</script>

<template>
  <TheBreadcrumb />
  <section class="movies-page">
    <!-- on '/movies' it is MoviesListPage.vue -->
    <router-view />
    <!--  -->
  </section>
</template>

<style lang="scss" scoped></style>
