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
    <a href="#">
      <LogoImage />
    </a>
    <HeaderNavigation class="header__navigation" />
    <HeaderActions class="header__actions" />
    <HamburgerButton class="header__hamburger" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  border: 1px dashed red;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 2.4rem;

  background-color: $white;

  height: 9.8rem;
  width: 100%;

  &__navigation,
  &__actions {
    display: none;
  }

  @include screen-medium {
    padding: 0 4.8rem;
    height: 11.2rem;

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
