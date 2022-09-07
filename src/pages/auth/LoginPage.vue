<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';

import BaseHeading from '@/components/base/BaseHeading.vue';
// import AuthFormCard from '@/components/auth/AuthFormCard.vue';
// import BaseInput from '@/components/base/BaseInput.vue';
// import BaseButton from '@/components/base/BaseButton.vue';
import LoginForm from '@/components/auth/login/LoginForm.vue';

export default defineComponent({
  components: {
    BaseHeading,
    // AuthFormCard,
    // BaseInput,
    // BaseButton,
    LoginForm,
  },
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.auth.isLoggedIn;
    },
  },
  methods: {
    async onSubmit() {
      await this.auth.login({
        email: this.email,
        password: this.password,
      });
    },
    logout() {
      this.auth.logout();
    },
  },
});
</script>

<template>
  <section class="login-page">
    <!-- for testing only -->
    <button v-if="isLoggedIn" @click="logout">Log out</button>
    <!---------------------->
    <BaseHeading heading-size="large" class="login-page__heading">
      <span class="login-page__heading--dark"> Hi there! </span>
      <span class="login-page__heading--light"> Care to log in? </span>
    </BaseHeading>

    <LoginForm
      @submit.prevent="onSubmit"
      @email-update="value => (email = value)"
      @password-update="value => (password = value)"
      class="login-page__form"
    />

    <span class="login-page__reset">
      Did you forget your password? <a href="#">Reset it now</a>
    </span>
  </section>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: 4rem;
  margin: 8rem 0;

  @include screen-min-medium {
    align-items: flex-start;
  }

  &__heading {
    text-align: center;
    display: flex;
    flex-direction: column;
    &--light {
      color: $gray-jumbo;
    }
    @include screen-min-medium {
      text-align: left;
    }
  }

  &__reset {
    color: $gray-tuna;
  }
}
</style>
