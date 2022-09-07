<script>
import { defineComponent } from 'vue';

import BaseHeading from '@/components/base/BaseHeading.vue';
import RegisterFirstForm from '@/components/auth/register/RegisterFirstForm.vue';
import RegisterSecondForm from '@/components/auth/register/RegisterSecondForm.vue';

export default defineComponent({
  components: {
    BaseHeading,
    RegisterFirstForm,
    RegisterSecondForm,
  },
  data() {
    return {
      step: 0,
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      privacyPolicyCheck: false,
    };
  },
  methods: {
    async onSubmit() {
      // TODO: validation logic
      this.step++;
      if (this.step > 1) {
        // TODO: submitting form to API logic
        // TODO: redirect to login page OR just login with this data
        // for hints check file: LoginPage.vue
      }
    },
  },
});
</script>

<template>
  <section class="register-page">
    <BaseHeading heading-size="large" class="register-page__heading">
      <span class="register-page__heading--dark"> Ahoy you! </span>
      <span class="register-page__heading--light"> Care to register? </span>
    </BaseHeading>

    <RegisterFirstForm
      v-if="step === 0"
      @submit.prevent="onSubmit"
      @email-update="value => (email = value)"
      @password-update="value => (password = value)"
      class="register-page__form"
    />

    <RegisterSecondForm
      v-if="step === 1"
      @submit.prevent="onSubmit"
      @first-name-update="value => (firstName = value)"
      @last-name-update="value => (lastName = value)"
      @birth-date-update="value => (dateOfBirth = value)"
      @privacy-policy-update="value => (privacyPolicyCheck = value)"
      class="register-page__form"
    />
  </section>
</template>

<style lang="scss" scoped>
.register-page {
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
}
</style>
