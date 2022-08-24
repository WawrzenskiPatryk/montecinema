<script>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<template>
  <main class="landing-panel">
    <router-view />
  </main>
</template>

<style lang="scss">
.landing-panel {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  // min-height: calc(100vh + 1px);
}
</style>
