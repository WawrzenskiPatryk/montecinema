<template>
  <main class="auth-panel">
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
.auth-panel {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: calc(100vh - $header-height-small);
  @include screen-min-medium {
    min-height: calc(100vh - $header-height-regular);
  }
}
</style>
