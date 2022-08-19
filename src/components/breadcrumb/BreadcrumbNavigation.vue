<script>
import { defineComponent } from 'vue';

import ArrowheadRight from '@/assets/icons/arrowhead-right.svg';

export default defineComponent({
  components: {
    ArrowheadRight,
  },
  methods: {
    capitalizeFirstCharacter(string) {
      return string[0].toUpperCase() + string.slice(1);
    },
    formatRouteName(route) {
      if (!route || route.length === 0) return;
      const routeName = route.split('-').join(' ');
      return this.capitalizeFirstCharacter(routeName);
    },
    getLinksFullPath(index) {
      return '/' + this.routeElements.slice(0, index + 1).join('/');
    },
  },
  computed: {
    routeElements() {
      return this.$route.fullPath.slice(1).split('/');
    },
  },
});
</script>

<template>
  <nav class="breadcrumb-navigation">
    <ul class="breadcrumb-navigation__list">
      <li
        class="breadcrumb-navigation__element"
        v-for="(route, index) in routeElements"
        :key="route"
      >
        <ArrowheadRight class="breadcrumb-navigation__arrowhead" v-if="index > 0" />

        <router-link
          v-if="index + 1 !== routeElements.length"
          :to="getLinksFullPath(index)"
          class="breadcrumb-navigation__link breadcrumb-navigation__link--available"
        >
          {{ formatRouteName(route) }}
        </router-link>
        <span v-else class="breadcrumb-navigation__link breadcrumb-navigation__link--exact">
          {{ formatRouteName(route) }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumb-navigation {
  &__list {
    display: flex;
    align-items: center;
    list-style-type: none;
    height: 100%;
    padding: 0;

    @include screen-min-medium {
      gap: 0.8rem;
    }
  }

  &__element {
    display: flex;
    align-items: center;
    height: 100%;
    @include screen-min-medium {
      gap: 0.8rem;
    }
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
