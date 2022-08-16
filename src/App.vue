<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader.vue';

export default defineComponent({
  components: {
    TheHeader,
  },
});
</script>

<template>
  <div class="app">
    <TheHeader></TheHeader>
    <main></main>
  </div>
</template>

<style lang="scss"></style>
