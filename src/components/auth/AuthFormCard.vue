<template>
  <form @submit.prevent class="auth-form-card">
    <slot />
  </form>
</template>

<style lang="scss" scoped>
.auth-form-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4.8rem;

  @include screen-min-medium {
    padding: 6.4rem;
    gap: 4rem;

    width: 60rem;
    height: 42rem;

    box-shadow: $shadow-auth-card;
    border-radius: 2.4rem;
  }
}
</style>
