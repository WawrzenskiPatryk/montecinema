<script>
import { defineComponent } from 'vue';
import { getUserData } from '@/services/api/data.js';
import { useMeta } from 'vue-meta';

import UserDetailsForm from '@/components/user/UserDetailsForm.vue';

export default defineComponent({
  components: {
    UserDetailsForm,
  },
  setup() {
    useMeta({ title: 'My account' });
  },
  mounted() {
    this.getUserData();
  },
  data() {
    return {
      isLoading: true,
      userData: null,
    };
  },
  methods: {
    async getUserData() {
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
  },
});
</script>

<template>
  <section class="user-account-page">
    <div v-if="isLoading">
      <h1>Loading...</h1>
    </div>
    <!-- probably should be a router-link -->
    <UserDetailsForm v-else :user-data="userData" />
    <!--  -->
  </section>
</template>

<style lang="scss" scoped></style>
