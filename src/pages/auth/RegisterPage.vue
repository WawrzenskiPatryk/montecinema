<script>
import { defineComponent } from 'vue';
import { useMeta } from 'vue-meta';

import BaseHeading from '@/components/base/BaseHeading.vue';
import RegisterFirstForm from '@/components/auth/register/RegisterFirstForm.vue';
import RegisterSecondForm from '@/components/auth/register/RegisterSecondForm.vue';

export default defineComponent({
  components: {
    BaseHeading,
    RegisterFirstForm,
    RegisterSecondForm,
  },
  setup() {
    useMeta({ title: 'Register' });
  },
  data() {
    return {
      step: 0,
      firstStepData: {
        email: '',
        password: '',
      },
      secondStepData: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        privacyPolicyCheck: false,
      },
    };
  },
  methods: {
    async onStepSubmit(userData) {
      // TODO: validation logic

      if (this.step === 0) {
        this.firstStepData = userData;
      } else if (this.step === 1) {
        this.secondStepData = userData;
      }

      this.step++;

      if (this.step > 1) {
        // TODO: submitting form to API logic

        const credentials = {
          ...this.firstStepData,
          ...this.secondStepData,
        };

        console.log('creds: ', credentials);

        // await this.auth.register(credentials);

        // TODO: redirect to login page OR just login with this data
        // this.$router.push({ name: 'LoginPage' });
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
      @register-step-submit="onStepSubmit"
      class="register-page__form"
    />
    <RegisterSecondForm
      v-else-if="step === 1"
      @register-step-submit="onStepSubmit"
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
