<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      navigationItems: [
        { id: 0, label: 'Movies', path: { name: 'MoviesListPage' } },
        { id: 1, label: 'Screenings', path: { name: 'ScreeningsPage' } },
        { id: 2, label: 'Contact us', path: { name: 'ContactPage' } },
      ],
    };
  },
});
</script>

<template>
  <ul class="header-navigation">
    <li class="header-navigation__item" v-for="item in navigationItems" :key="item.id">
      <router-link
        :to="item.path"
        class="header-navigation__item-link"
        active-class="header-navigation__item-link--active"
      >
        {{ item.label }}
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.header-navigation {
  margin: 0;
  padding: 0;
  height: 100%;

  font-size: $font-size-large;
  user-select: none;

  &__item {
    height: 100%;
    width: 14rem;

    list-style-type: none;
    color: $gray-jumbo;

    @include hover {
      color: $gray-midgray;
      box-shadow: inset 0px -4px 0px $red-cosmos;
    }
  }

  &__item-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: inherit;
    text-decoration: none;

    &--active {
      box-shadow: inset 0px -4px 0px $red-cherryred;
      color: $gray-abbey;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
