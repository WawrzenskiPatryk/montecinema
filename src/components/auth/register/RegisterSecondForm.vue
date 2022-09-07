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
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      privacyPolicyCheck: false,
    };
  },
  watch: {
    firstName() {
      this.$emit('firstNameUpdate', this.firstName);
    },
    lastName() {
      this.$emit('lastNameUpdate', this.lastName);
    },
    dateOfBirth() {
      this.$emit('birthDateUpdate', this.dateOfBirth);
    },
    privacyPolicyCheck() {
      this.$emit('privacyPolicyUpdate', this.privacyPolicyCheck);
    },
  },
});
</script>

<template>
  <AuthFormCard class="register-form">
    <BaseInput
      v-model="firstName"
      type="text"
      label="First Name"
      placeholder="e.g. Jessica"
      class="register-form__input"
    />
    <BaseInput
      v-model="lastName"
      type="text"
      label="Last Name"
      placeholder="e.g. Walton"
      class="register-form__input"
    />
    <!-- TODO: date-picker and its v-model -->
    <!-- TODO: checkbox and its v-model -->
    <div class="register-form__buttons">
      <BaseButton size="large" class="register-form__button" type="submit"> Register </BaseButton>
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
