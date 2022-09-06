<script>
import { defineComponent } from 'vue';

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
  data() {
    return {
      email: '',
      password: '',
    };
  },
});
</script>

<template>
  <section class="login-page">
    <BaseHeading heading-size="large" class="login-page__heading">
      <span class="login-page__heading--dark"> Hi there! </span>
      <span class="login-page__heading--light"> Care to log in? </span>
    </BaseHeading>
    <AuthFormCard class="login-page__form">
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
        <BaseButton size="large" button-type="borderless-red" class="login-page__form-button">
          Register instead
        </BaseButton>
        <BaseButton size="large" class="login-page__form-button"> Log in</BaseButton>
      </div>
    </AuthFormCard>
  </section>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 4rem;

  &__heading {
    display: flex;
    flex-direction: column;
    &--light {
      color: $gray-jumbo;
    }
  }

  &__form-input {
    width: 100%;
  }

  &__form-buttons {
    display: flex;
    gap: 1.6rem;
    min-width: 100%;
  }

  &__form-button {
    flex: 1;
    padding: 0;
  }
}
</style>
