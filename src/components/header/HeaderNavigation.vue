<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      navigationItems: [
        { id: 0, label: 'Movies', path: '#' },
        { id: 1, label: 'Screenings', path: '#' },
        { id: 2, label: 'Contact Us', path: '#' },
      ],
    };
  },
});
</script>

<template>
  <ul class="header-navigation">
    <li class="header-navigation__item" v-for="item in navigationItems" :key="item.id">
      <a class="header-navigation__item-link" :href="item.path">{{ item.label }}</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.header-navigation {
  font-family: 'Roboto', sans-serif;
  font-weight: $font-weight-regular;
  font-size: $font-size-large;

  height: 100%;
  margin: 0;
  padding: 0;

  &__item {
    height: 100%;
    width: 14rem;

    list-style-type: none;
    color: $gray-jumbo;

    @include hover {
      color: $gray-midgray;
      box-shadow: inset 0px -4px 0px $red-cosmos;
    }

    // TODO: just for testing purposes =========================
    // need to adjust logic for ROUTING (router active classes)
    &:first-of-type {
      box-shadow: inset 0px -4px 0px $red-cherryred;
      color: $gray-abbey;
      font-weight: $font-weight-bold;
    }
    // =========================================================
  }

  &__item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }
}
</style>
