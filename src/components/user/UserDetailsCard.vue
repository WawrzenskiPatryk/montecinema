<template>
  <div class="user-details-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.user-details-card {
  padding: 6.4rem;
  background-color: $white;
  box-shadow: $shadow-auth-card;
  border-radius: 24px;
}
</style>
