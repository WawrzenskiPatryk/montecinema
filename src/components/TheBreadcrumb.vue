<script>
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import ArrowheadRight from '@/assets/icons/arrowhead-right.svg';

export default defineComponent({
  components: {
    BaseButton,
    ArrowheadRight,
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
    <BaseButton @click="$router.push(parentPath)" arrowType="left" buttonType="hollow-dark">
      Back
    </BaseButton>
    <ul class="breadcrumb__navigation">
      <li
        class="breadcrumb__navigation-element"
        v-for="(route, index) in routeElements"
        :key="route"
      >
        <ArrowheadRight v-if="index > 0" />

        <router-link v-if="index + 1 !== routeElements.length" :to="getFullPath(index)">
          {{ formatRouteName(route) }}
        </router-link>
        <span v-else>
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
  gap: 5rem;

  &__navigation {
    display: flex;
    list-style-type: none;
  }
}
</style>
