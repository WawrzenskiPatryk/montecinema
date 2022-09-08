<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    checkboxId: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :required="required"
      :id="checkboxId"
      class="checkbox__field"
    />
    <label class="checkbox__label" :for="checkboxId">
      <slot>checkbox_label</slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  // border: 1px solid red;
  &__label {
    user-select: none;
  }
}
</style>
