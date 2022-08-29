<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <label class="input u-form-label">
    {{ label }}
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="input__field u-form-field"
    />
  </label>
</template>

<style lang="scss" scoped>
.input {
  &__field {
    &::placeholder {
      color: $gray-jumbo;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
}
</style>
