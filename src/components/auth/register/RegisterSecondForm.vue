<script>
import { defineComponent } from 'vue';

import AuthFormCard from '@/components/auth/AuthFormCard.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCheckbox from '@/components/base/BaseCheckbox.vue';
import DateInput from '@/components/input/DateInput.vue';

export default defineComponent({
  components: {
    AuthFormCard,
    BaseInput,
    BaseButton,
    BaseCheckbox,
    DateInput,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      privacyPolicyCheck: false,
    };
  },
  methods: {
    onSubmit() {
      const userData = {
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
      };
      this.$emit('registerStepSubmit', userData);
    },
  },
});
</script>

<template>
  <AuthFormCard @submit.prevent="onSubmit" class="register-form">
    <BaseInput
      v-model="firstName"
      required
      type="text"
      label="First Name"
      placeholder="e.g. Jessica"
      class="register-form__input"
    />
    <BaseInput
      v-model="lastName"
      required
      type="text"
      label="Last Name"
      placeholder="e.g. Walton"
      class="register-form__input"
    />
    <DateInput
      v-model="dateOfBirth"
      required
      label="Date of Birth"
      placeholder="DD / MM / YYYY"
      class="register-form__input"
    />
    <BaseCheckbox v-model="privacyPolicyCheck" required class="register-form__checkbox">
      <span class="register-form__checkbox-label">
        I accept <a href="#" class="register-form__checkbox-label--link">Privacy Policy</a>
      </span>
    </BaseCheckbox>

    <div class="register-form__buttons-wrapper">
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

  &__checkbox-label {
    color: $gray-charade;
    &--link {
      color: inherit;
      text-decoration: underline;
      @include hover {
        color: $gray-jumbo;
      }
    }
  }

  &__buttons-wrapper {
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
