<script>
import { defineComponent } from 'vue';
import { getUserData } from '@/services/api/data.js';
import { updateUser } from '@/services/api/auth.js';
import { useMainStore } from '@/store/index.js';
import { useMeta } from 'vue-meta';

import UserDetailsForm from '@/components/user/UserDetailsForm.vue';
import UserDetailsCard from '@/components/user/UserDetailsCard.vue';

export default defineComponent({
  components: {
    UserDetailsForm,
    UserDetailsCard,
  },
  setup() {
    const mainStore = useMainStore();
    useMeta({ title: 'My account' });
    return { mainStore };
  },
  mounted() {
    this.getCurrentUserData();
  },
  data() {
    return {
      isUnauthorized: false,
      isLoading: true,
      userData: null,
    };
  },
  methods: {
    async getCurrentUserData() {
      try {
        this.isLoading = true;
        this.userData = await getUserData();
      } catch (error) {
        if (error.response.status === 401) {
          this.isUnauthorized = true;
        } else {
          throw new Error(error); // to find unhandled scenarios in development
        }
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
        if (error.response.status === 401) {
          this.isUnauthorized = true;
        } else if (error.response.status === 422) {
          const wrongDataError = new Error('Please provide correct data');
          this.mainStore.storeErrorToDisplay(wrongDataError);
        } else {
          throw new Error(error); // to find unhandled scenarios in development
        }
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
      <UserDetailsForm
        v-else-if="!isUnauthorized"
        @user-data-update="onUpdateSubmit"
        :user-data="userData"
      />
    </UserDetailsCard>
  </section>
</template>

<style lang="scss" scoped>
.user-account-page {
  padding: 6.4rem 0;
}
</style>
