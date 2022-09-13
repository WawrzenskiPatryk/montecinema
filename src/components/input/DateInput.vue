<script>
import { defineComponent } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  components: {
    BaseInput,
  },
  data() {
    return {
      isTypeDate: false,
    };
  },
  updated() {
    if (this.$refs.dateInput.modelValue) this.isTypeDate = true;
  },
  computed: {
    computedType() {
      if (this.isTypeDate) return 'date';
      else return 'text';
    },
  },
  methods: {
    onTouch(event) {
      if (event.type === 'focus') this.isTypeDate = true;
      else if (!event.target.value) this.isTypeDate = false;
    },
  },
});
</script>

<template>
  <BaseInput :type="computedType" @input-touch="onTouch" ref="dateInput" />
</template>
