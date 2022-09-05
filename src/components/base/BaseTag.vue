<template>
  <span class="tag">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.tag {
  font-family: 'Roboto', sans-serif;
  font-weight: $font-weight-bold;
  font-size: 1.4rem;
  line-height: 1.6rem;

  color: $red-bittersweet;
  background: $red-wisppink;

  width: fit-content;
  padding: 0.8rem 1.6rem;
  border-radius: 2.4rem;
}
</style>
