<script>
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth.js';
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
    useMeta({ title: 'Log in' });
    return { auth };
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  //
  // TODO: Ask someone for help with guarding this page
  // from entering while being already logged in:
  //
  // beforeRouteEnter(_, from, next) {
  //   next(vm => {
  //     if (vm.isLoggedIn) {
  //       vm.$router.replace(from.path);
  //     }
  //   });
  // },
  // computed: {
  //   isLoggedIn() {
  //     return this.auth.isLoggedIn;
  //   },
  // },
  //
  methods: {
    async onSubmit() {
      await this.auth.login({
        email: this.email,
        password: this.password,
      });
      // TODO: router push to previous page if we ended up here because of error 401
      this.$router.push({ name: 'HomePage' });
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

    <LoginForm
      @submit.prevent="onSubmit"
      @email-update="value => (email = value)"
      @password-update="value => (password = value)"
      class="login-page__form"
    />

    <span class="login-page__reset">
      Did you forget your password? <a href="#" class="login-page__reset--link">Reset it now</a>
    </span>
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
