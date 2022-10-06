<script setup>
import { useMeta } from 'vue-meta';
import UserDetailsCard from '@/components/user/UserDetailsCard.vue';

const links = [
  { id: 0, text: 'Personal Details', componentName: 'UserPersonalDetailsPage' },
  { id: 1, text: 'Reservations', componentName: 'UserReservationsPage' },
];

useMeta({ title: 'My account' });
</script>

<template>
  <section class="user-account-page">
    <nav class="user-account-page__navigation">
      <router-link
        v-for="link in links"
        :key="link.id"
        :to="{ name: link.componentName }"
        class="user-account-page__navigation-link"
        active-class="user-account-page__navigation-link--active"
      >
        {{ link.text }}
      </router-link>
    </nav>
    <UserDetailsCard class="user-account-page__card">
      <router-view />
    </UserDetailsCard>
  </section>
</template>

<style lang="scss" scoped>
.user-account-page {
  padding-bottom: 6.4rem;

  &__navigation {
    margin: 6.4rem 0;
    display: flex;
    gap: 6.4rem;
  }

  &__navigation-link {
    font-family: 'Eczar';
    font-weight: 600;
    font-size: 4.8rem;
    line-height: 102%;
    letter-spacing: -0.01em;
    color: $gray-bombay;
    @include button-states($gray-jumbo, none, none);

    &--active {
      color: $gray-tuna;
      pointer-events: none;
      @include button-states($gray-tuna, none, none);
    }
  }
}
</style>
