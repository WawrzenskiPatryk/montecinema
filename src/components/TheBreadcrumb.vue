<script>
import { defineComponent } from 'vue';

import BreadcrumbNavigation from '@/components/breadcrumb/BreadcrumbNavigation.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default defineComponent({
  components: {
    BaseButton,
    BreadcrumbNavigation,
    ArrowLeftIcon,
  },
  computed: {
    parentPath() {
      const currentFullPath = this.$route.fullPath;
      const indexOfLastSlash = currentFullPath.lastIndexOf('/');
      const parentPath = currentFullPath.slice(0, indexOfLastSlash);
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
      class="breadcrumb__button"
    >
      Back
    </BaseButton>
    <ArrowLeftIcon @click="$router.push(parentPath)" class="breadcrumb__arrow" />
    <BreadcrumbNavigation />
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
    display: none;

    @include screen-min-medium {
      display: inherit;
    }
  }

  &__arrow {
    cursor: pointer;
    stroke: $gray-tuna;

    @include hover {
      stroke: $gray-jumbo;
    }

    @include screen-min-medium {
      display: none;
    }
  }
}
</style>
