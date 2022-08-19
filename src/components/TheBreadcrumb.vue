<script>
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import ArrowheadRight from '@/assets/icons/arrowhead-right.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default defineComponent({
  components: {
    BaseButton,
    ArrowheadRight,
    ArrowLeftIcon,
  },
  methods: {
    formatRouteName(route) {
      if (!route || route.length === 0) return;
      const routeName = route.split('-').join(' ');
      const firstLetter = routeName[0];
      return firstLetter.toUpperCase() + routeName.slice(1);
    },
    getFullPath(index) {
      return '/' + this.routeElements.slice(0, index + 1).join('/');
    },
  },
  computed: {
    currentFullPath() {
      return this.$route.fullPath;
    },
    routeElements() {
      return this.currentFullPath.slice(1).split('/');
    },
    parentPath() {
      const indexOfLastSlash = this.currentFullPath.lastIndexOf('/');
      const parentPath = this.currentFullPath.slice(0, indexOfLastSlash);
      if (!parentPath || parentPath.length === 0) return '/';
      return parentPath;
    },
  },
});
</script>

<template>
  <div class="breadcrumb">
    <BaseButton
      @click="$router.push(parentPath)"
      arrowType="left"
      buttonType="hollow-dark"
      class="breadcrumb__button breadcrumb__button--base"
    >
      Back
    </BaseButton>

    <ArrowLeftIcon
      @click="$router.push(parentPath)"
      class="breadcrumb__button breadcrumb__button--arrow"
    />

    <ul class="breadcrumb__navigation">
      <li
        class="breadcrumb__navigation-element"
        v-for="(route, index) in routeElements"
        :key="route"
      >
        <ArrowheadRight class="breadcrumb__navigation-arrowhead" v-if="index > 0" />

        <router-link
          v-if="index + 1 !== routeElements.length"
          :to="getFullPath(index)"
          class="breadcrumb__navigation-link breadcrumb__navigation-link--available"
        >
          {{ formatRouteName(route) }}
        </router-link>
        <span v-else class="breadcrumb__navigation-link breadcrumb__navigation-link--exact">
          {{ formatRouteName(route) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  gap: 0.8rem;

  width: 100%;
  height: 4rem;
  margin-bottom: 4rem;

  background-color: $red-wisppink;

  @include screen-min-medium {
    gap: 3.2rem;
    height: 8rem;
    margin-bottom: 6.4rem;
  }

  &__button {
    &--base {
      display: none;
    }
    &--arrow {
      cursor: pointer;
      stroke: $gray-tuna;
      @include hover {
        stroke: $gray-jumbo;
      }
    }
    @include screen-min-medium {
      &--base {
        display: inherit;
      }
      &--arrow {
        display: none;
      }
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    list-style-type: none;
    height: 100%;
    padding: 0;

    @include screen-min-medium {
      gap: 0.8rem;
    }
  }

  &__navigation-element {
    display: flex;
    align-items: center;
    height: 100%;
    @include screen-min-medium {
      gap: 0.8rem;
    }
  }

  &__navigation-link {
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
