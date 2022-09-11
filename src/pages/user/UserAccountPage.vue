<script>
import { defineComponent } from 'vue';
import { getUserData } from '@/services/api/data.js';
import { updateUser } from '@/services/api/auth.js';
import { useMeta } from 'vue-meta';

import UserDetailsForm from '@/components/user/UserDetailsForm.vue';
import UserDetailsCard from '@/components/user/UserDetailsCard.vue';

export default defineComponent({
  components: {
    UserDetailsForm,
    UserDetailsCard,
  },
  setup() {
    useMeta({ title: 'My account' });
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
    },
    async onUpdateSubmit(credentials) {
      try {
        this.isLoading = true;
        await updateUser(credentials);
        this.userData = await getUserData();
      } catch (error) {
        alert(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<template>
  <section class="user-account-page">
    <UserDetailsCard class="user-account-page__card">
      <div v-if="isLoading">
        <!-- todo spinner -->
        <h1>Loading...</h1>
      </div>
      <!-- todo: probably should be a router-view -->
      <UserDetailsForm v-else @user-data-update="onUpdateSubmit" :user-data="userData" />
    </UserDetailsCard>
  </section>
</template>

<style lang="scss" scoped>
.user-account-page {
  padding: 6.4rem 0;
}
</style>
