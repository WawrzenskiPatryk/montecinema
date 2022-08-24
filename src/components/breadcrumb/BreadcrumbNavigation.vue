<script>
import { defineComponent } from 'vue';

import ArrowheadRight from '@/assets/icons/arrowhead-right.svg';

export default defineComponent({
  components: {
    ArrowheadRight,
  },
  props: {
    secondItem: {
      type: String,
      default: '',
    },
  },
  methods: {
    capitalizeFirstCharacter(string) {
      return string[0].toUpperCase() + string.slice(1);
    },
    formatRouteName(name) {
      const routeName = name.split('-').join(' ');
      return this.capitalizeFirstCharacter(routeName);
    },
  },
  computed: {
    firstRouteElement() {
      return this.$route.fullPath.slice(1).split('/')[0];
    },
  },
});
</script>

<template>
  <nav v-if="!!secondItem" class="breadcrumb-navigation">
    <router-link
      :to="`/${firstRouteElement}`"
      class="breadcrumb-navigation__link breadcrumb-navigation__link--available"
    >
      {{ formatRouteName(firstRouteElement) }}
    </router-link>

    <ArrowheadRight class="breadcrumb-navigation__arrowhead" />

    <span class="breadcrumb-navigation__link breadcrumb-navigation__link--exact">
      {{ secondItem }}
    </span>
  </nav>

  <nav v-else class="breadcrumb-navigation">
    <span class="breadcrumb-navigation__link breadcrumb-navigation__link--exact">
      {{ formatRouteName(firstRouteElement) }}
    </span>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb-navigation {
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 100%;
  padding: 0;

  @include screen-min-medium {
    gap: 0.8rem;
  }

  &__link {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 100%;
    letter-spacing: 0.015em;

    text-decoration: none;

    @include screen-min-medium {
      font-size: 1.6rem;
    }

    &--available {
      color: $red-cherryred;

      @include hover {
        color: $red-totempole;
      }
    }

    &--exact {
      color: $gray-tuna;
      user-select: none;
    }
  }
}
</style>
