<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
import { useMainStore } from '@/store/index.js';
import { useMeta } from 'vue-meta';

import BaseHeading from '@/components/base/BaseHeading.vue';
import LoginForm from '@/components/auth/login/LoginForm.vue';

export default defineComponent({
  components: {
    BaseHeading,
    LoginForm,
  },
  setup() {
    const auth = useAuthStore();
    const mainStore = useMainStore();
    useMeta({ title: 'Log in' });
    return { auth, mainStore };
  },
  data() {
    return {
      isSubmitted: false,
    };
  },
  methods: {
    async onLoginSubmit(credentials) {
      try {
        this.isSubmitted = true;
        await this.auth.login(credentials);
        if (this.$route.query.redirect) {
          this.$router.push({ name: this.$route.query.redirect });
        } else {
          this.$router.push({ name: 'HomePage' });
        }
      } catch (error) {
        if (error.response.status === 401) {
          const loginError = new Error('Incorrect email or password. Please try again.');
          this.mainStore.storeErrorToDisplay(loginError);
          this.isSubmitted = false;
        } else {
          throw new Error(error);
        }
      }
    },
  },
});
</script>

<template>
  <section class="login-page">
    <BaseHeading heading-size="large" class="login-page__heading">
      <span class="login-page__heading--dark"> Hi there! </span>
      <span class="login-page__heading--light"> Care to log in? </span>
    </BaseHeading>

    <LoginForm @login-submit="onLoginSubmit" :is-submitted="isSubmitted" class="login-page__form" />
    <span class="login-page__reset">
      Did you forget your password? <a href="#" class="login-page__reset--link">Reset it now</a>
    </span>

    <!-- <div v-else>
      <h1>Loading...</h1>
    </div> -->
  </section>
</template>

<style lang="scss" scoped>
.login-page {
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

  &__reset {
    color: $gray-tuna;
    &--link {
      font-weight: $font-weight-medium;
    }
  }
}
</style>
