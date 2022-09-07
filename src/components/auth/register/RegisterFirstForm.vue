<script>
import { defineComponent } from 'vue';

import AuthFormCard from '@/components/auth/AuthFormCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
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
  watch: {
    email() {
      this.$emit('emailUpdate', this.email);
    },
    password() {
      this.$emit('passwordUpdate', this.password);
    },
  },
});
</script>

<template>
  <AuthFormCard class="register-form">
    <BaseInput
      v-model="email"
      type="email"
      label="Email"
      placeholder="Something ending with monterail.com"
      class="register-form__input"
    />
    <BaseInput
      v-model="password"
      type="password"
      label="Password"
      placeholder="Enter your password"
      class="register-form__input"
    />
    <div class="register-form__buttons">
      <BaseButton size="large" class="register-form__button" type="submit"> Next step </BaseButton>
      <BaseButton
        :to="{ name: 'LoginPage' }"
        size="large"
        button-type="borderless-red"
        class="register-form__button"
      >
        Log in instead
      </BaseButton>
    </div>
  </AuthFormCard>
</template>

<style lang="scss" scoped>
.register-form {
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
