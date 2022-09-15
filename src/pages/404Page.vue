<script>
import { defineComponent } from 'vue';
import { useMeta } from 'vue-meta';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  setup() {
    useMeta({ title: '404: Not Found' });
  },
});
</script>

<template>
  <h1>We couldn't find the page you wanted.</h1>
  <BaseButton replace :to="{ name: 'HomePage' }" button-type="hollow-red">
    Go to home page
  </BaseButton>
</template>
