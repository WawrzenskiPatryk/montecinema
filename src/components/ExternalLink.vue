<template>
  <a target="_blank" rel="noopener noreferrer" class="external-link">
    <slot />
  </a>
</template>

<style lang="scss" scoped>
.external-link {
  text-decoration: none;
  font-family: 'Roboto Mono', monospace;
  color: $red-cherryred;
  font-weight: $font-weight-medium;
  @include hover {
    color: $red-totempole;
  }
  &:focus-visible,
  &:active {
    color: $red-totempole;
  }
  &:focus {
    outline: 0.2rem $red-totempole solid;
  }
}
</style>
