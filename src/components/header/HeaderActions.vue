<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
import { getUserData } from '@/services/api/data.js'; // <<< for testing only

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
    // for testing only >>>>
    async getSecretData() {
      this.user = await getUserData();
      console.table(this.user);
    },
    // <<<
    logout() {
      this.auth.logout();
    },
  },
});
</script>

<template>
  <div v-if="isLoggedIn" class="header-actions">
    <BaseButton @click="getSecretData" button-type="hollow-red">My account</BaseButton>
    <BaseButton @click="logout">Log out</BaseButton>
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
