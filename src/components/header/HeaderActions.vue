<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';

import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  computed: {
    isLoggedIn() {
      return this.auth.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.auth.logout();
      this.$router.push({ name: 'HomePage' });
    },
  },
});
</script>

<template>
  <div v-if="isLoggedIn" class="header-actions">
    <BaseButton :to="{ name: 'UserAccountPage' }" button-type="hollow-red">My account</BaseButton>
    <BaseButton @click="logout">Logout</BaseButton>
  </div>
  <div v-else class="header-actions">
    <BaseButton :to="{ name: 'RegisterPage' }" button-type="borderless-red">Register</BaseButton>
    <BaseButton :to="{ name: 'LoginPage' }">Login</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.header-actions {
  gap: 1.6rem;
}
</style>
