<script>
import { defineComponent } from 'vue';

import AuthFormCard from '@/components/auth/AuthFormCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import PasswordInput from '../../input/PasswordInput.vue';

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
      const userData = {
        email: this.email,
        password: this.password,
      };
      this.$emit('registerStepSubmit', userData);
    },
  },
});
</script>

<template>
  <AuthFormCard @submit.prevent="onSubmit" class="register-form">
    <BaseInput
      v-model="email"
      required
      type="email"
      label="Email"
      placeholder="Something ending with monterail.com"
      class="register-form__input"
    />
    <PasswordInput
      v-model="password"
      required
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
