<template>
  <h1 class="base-heading">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.base-heading {
  font-family: 'Eczar', serif;
  font-weight: $font-weight-semibold;
  font-size: 4.8rem;
  line-height: 102%;
  letter-spacing: -0.01em;
  color: $gray-tuna;
  @include screen-min-medium {
    font-size: 8rem;
  }
}
</style>
