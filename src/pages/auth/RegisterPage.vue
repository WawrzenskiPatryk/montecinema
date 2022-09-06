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
  <section class="register-page">
    <BaseHeading heading-size="large" class="register-page__heading">
      <span class="register-page__heading--dark"> Ahoy you! </span>
      <span class="register-page__heading--light"> Care to register? </span>
    </BaseHeading>
    <AuthFormCard class="register-page__form">
      <BaseInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="Something ending with monterail.com"
        class="register-page__form-input"
      />
      <BaseInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        class="register-page__form-input"
      />
      <div class="register-page__form-buttons">
        <BaseButton size="large" class="register-page__form-button"> Next step </BaseButton>
        <BaseButton
          :to="{ name: 'LoginPage' }"
          size="large"
          button-type="borderless-red"
          class="register-page__form-button"
        >
          Log in instead
        </BaseButton>
      </div>
    </AuthFormCard>
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
}
</style>
