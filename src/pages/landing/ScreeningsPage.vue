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
  <section class="screenings-page">
    <h1>Screenings Page</h1>
  </section>
</template>

<style lang="scss" scoped></style>
