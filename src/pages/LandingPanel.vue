<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <main class="landing-panel">
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
  .landing-panel {
    min-height: calc(100vh + 1px);
  }
</style>
