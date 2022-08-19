<script>
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
});
</script>

<template>
  <div class="header-actions">
    <BaseButton buttonType="borderless-red">Register</BaseButton>
    <BaseButton>Login</BaseButton>
  </div>
</template>

<style lang="scss" scoped>
.header-actions {
  gap: 1.6rem;
}
</style>
