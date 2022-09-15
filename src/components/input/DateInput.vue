<script>
import { defineComponent } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';

export default defineComponent({
  components: {
    BaseInput,
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  updated() {
    this.onUpdate(this.modelValue);
  },
  data() {
    return {
      isTypeDate: false,
    };
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
    onUpdate(value) {
      if (value) this.isTypeDate = true;
      this.$emit('update:modelValue', value);
    },
  },
});
</script>

<template>
  <BaseInput
    :model-value="modelValue"
    :type="computedType"
    @update:model-value="onUpdate"
    @input-touch="onTouch"
  />
</template>
