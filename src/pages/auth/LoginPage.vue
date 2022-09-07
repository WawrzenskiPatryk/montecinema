<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';

import BaseHeading from '@/components/base/BaseHeading.vue';
import AuthFormCard from '@/components/auth/AuthFormCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseHeading,
    AuthFormCard,
    BaseInput,
    BaseButton,
  },
  setup() {
    const auth = useAuthStore();
    return { auth };
  },
  data() {
    return {
      email: '',
      password: '',
      user: null,
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

    <!-- TODO: Make this login form-card as an independent component -------------------->
    <!-- todo c.d.: it will make things easier when implementing registration this way -->
    <AuthFormCard @submit.prevent="onSubmit" class="login-page__form">
      <BaseInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="Something ending with monterail.com"
        class="login-page__form-input"
      />
      <BaseInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        class="login-page__form-input"
      />
      <div class="login-page__form-buttons">
        <BaseButton size="large" class="login-page__form-button" type="submit"> Log in </BaseButton>
        <BaseButton
          :to="{ name: 'RegisterPage' }"
          size="large"
          button-type="borderless-red"
          class="login-page__form-button"
        >
          Register instead
        </BaseButton>
      </div>
    </AuthFormCard>
    <!-- todo --------------------------------------------------------------------------->
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

  &__form-input {
    width: 100%;
  }

  &__form-buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 1.6rem;
    min-width: 100%;
  }

  &__form-button {
    flex: 1;
    padding: 0;
  }

  &__reset {
    color: $gray-tuna;
  }
}
</style>
