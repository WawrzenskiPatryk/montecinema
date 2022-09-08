<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
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
    const auth = useAuthStore();
    useMeta({ title: 'Register' });
    return { auth };
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
        const credentials = {
          ...this.firstStepData,
          ...this.secondStepData,
        };
        await this.auth.register(credentials);
        this.$router.push({ name: 'HomePage' });
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
