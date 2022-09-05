<script>
import { defineComponent } from 'vue';

import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  props: {
    seanceData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    seanceTime() {
      const date = new Date(this.seanceData.datetime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
  },
});
</script>

<template>
  <li>
    <BaseButton button-type="hollow-red" :to="'#'">
      {{ seanceTime }}
    </BaseButton>
  </li>
</template>
