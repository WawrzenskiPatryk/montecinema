<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
import { getUserData } from '@/services/api/data.js';
import { useMeta } from 'vue-meta';

import UserDetailsForm from '@/components/user/UserDetailsForm.vue';

export default defineComponent({
  components: {
    UserDetailsForm,
  },
  setup() {
    const auth = useAuthStore();
    useMeta({ title: 'My account' });
    return { auth };
  },
  mounted() {
    this.getCurrentUserData();
  },
  data() {
    return {
      isLoading: true,
      userData: null,
    };
  },
  methods: {
    async getCurrentUserData() {
      try {
        this.isLoading = true;
        this.userData = await getUserData();
      } catch {
        this.$router.push({ name: '404Page' });
      } finally {
        this.isLoading = false;
      }
      console.table(this.userData);
    },
    async onUpdateSubmit(credentials) {
      await this.auth.updateUser(credentials);
      this.userData = await getUserData();
    },
  },
});
</script>

<template>
  <section class="user-account-page">
    <div v-if="isLoading">
      <h1>Loading...</h1>
    </div>
    <!-- probably should be a router-view -->
    <UserDetailsForm v-else @user-data-update="onUpdateSubmit" :user-data="userData" />
    <!--  -->
  </section>
</template>

<style lang="scss" scoped></style>
