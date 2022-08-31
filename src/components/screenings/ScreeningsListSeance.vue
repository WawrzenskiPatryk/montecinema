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
      const datetime = this.seanceData.datetime;
      const timePoint = datetime.indexOf('T') + 1;
      return datetime.slice(timePoint).slice(0, 5);
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
