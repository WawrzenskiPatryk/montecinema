<script>
import { defineComponent } from 'vue';

import AuthFormCard from '@/components/auth/AuthFormCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import PasswordInput from '@/components/input/PasswordInput.vue';

export default defineComponent({
  components: {
    AuthFormCard,
    BaseInput,
    BaseButton,
    PasswordInput,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      const credentials = {
        email: this.email,
        password: this.password,
      };
      this.$emit('loginSubmit', credentials);
      this.email = '';
      this.password = '';
    },
  },
});
</script>

<template>
  <AuthFormCard @submit.prevent="onSubmit" class="login-form">
    <BaseInput
      v-model="email"
      required
      type="email"
      label="Email"
      placeholder="Something ending with monterail.com"
      class="login-form__input"
    />
    <PasswordInput
      v-model="password"
      required
      label="Password"
      placeholder="Enter your password"
      class="login-form__input"
    />
    <div class="login-form__buttons">
      <BaseButton size="large" class="login-form__button" type="submit"> Log in </BaseButton>
      <BaseButton
        :to="{ name: 'RegisterPage' }"
        size="large"
        button-type="borderless-red"
        class="login-form__button"
      >
        Register instead
      </BaseButton>
    </div>
  </AuthFormCard>
</template>

<style lang="scss" scoped>
.login-form {
  &__input {
    width: 100%;
  }

  &__buttons {
    display: flex;
    flex-direction: row-reverse;
    gap: 1.6rem;
    min-width: 100%;
  }

  &__button {
    flex: 1;
    padding: 0;
  }
}
</style>
