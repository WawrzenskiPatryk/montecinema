<script>
import { defineComponent } from 'vue';
import LogoImage from '@/assets/images/logo.svg';
import HamburgerButton from '@/assets/icons/hamburger-button.svg';
import HeaderNavigation from '@/components/header/HeaderNavigation.vue';
import HeaderActions from '@/components/header/HeaderActions.vue';

export default defineComponent({
  components: {
    LogoImage,
    HamburgerButton,
    HeaderNavigation,
    HeaderActions,
  },
});
</script>

<template>
  <header class="header">
    <router-link :to="{ name: 'HomePage' }">
      <LogoImage />
    </router-link>
    <HeaderNavigation class="header__navigation" />
    <HeaderActions class="header__actions" />
    <HamburgerButton class="header__hamburger" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: $page-padding-small;

  background-color: $white;

  height: $header-height-small;
  width: 100%;

  &__navigation,
  &__actions {
    display: none;
  }

  @include screen-min-medium {
    padding: $page-padding-regular;
    height: $header-height-regular;

    &__navigation,
    &__actions {
      display: inherit;
    }

    &__hamburger {
      display: none;
    }
  }
}
</style>
