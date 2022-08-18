<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      countdown: 5,
      timeout: null,
      interval: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.$router.replace({ name: 'HomePage' });
    }, 5000);

    this.interval = setInterval(() => {
      this.countdown--;
    }, 1000);
  },
  unmounted() {
    clearTimeout(this.timeout);
    clearInterval(this.interval);
    this.timeout = null;
    this.interval = null;
  },
});
</script>

<template>
  <h1>404: Page not found</h1>
  <h2>You will be redirected to Home Page in {{ countdown }}</h2>
  <router-link :to="{ name: 'HomePage' }" replace>Go to home page</router-link>
</template>
