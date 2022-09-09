<script>
import { defineComponent } from 'vue';
import PasswordVisibilityButton from '@/components/auth/PasswordVisibilityButton.vue';

export default defineComponent({
  components: {
    PasswordVisibilityButton,
  },
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
      validator(value) {
        return ['text', 'email', 'password', 'date', 'search'].join(' ').includes(value);
      },
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
  data() {
    return {
      isPasswordVisible: false,
      isdateInputFocused: false,
    };
  },
  computed: {
    computedType() {
      if (
        (this.type === 'date' && !this.isdateInputFocused) ||
        (this.type === 'password' && this.isPasswordVisible)
      ) {
        return 'text';
      } else return this.type;
    },
    inputClass() {
      return {
        'input__field--password': this.type === 'password',
      };
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    },
    touchHandler(event) {
      const isdateInputFocused = this.type === 'date' && event.type === 'focus';
      const isDateInputBlured = this.type === 'date' && event.type === 'blur';
      const isInputEmpty = !event.target.value;

      if (isdateInputFocused) {
        this.isdateInputFocused = true;
      } else if (isDateInputBlured && isInputEmpty) {
        this.isdateInputFocused = false;
      }
    },
  },
});
</script>

<template>
  <label class="input">
    {{ label }}
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="touchHandler"
      @blur="touchHandler"
      :type="computedType"
      :placeholder="placeholder"
      :required="required"
      class="input__field"
      :class="inputClass"
    />
    <PasswordVisibilityButton
      v-if="type === 'password'"
      @click.prevent="togglePasswordVisibility"
      :is-password-visible="isPasswordVisible"
      class="input__password-visibility-button"
    />
  </label>
</template>

<style lang="scss" scoped>
.input {
  display: inline-block;
  position: relative;
  font-family: 'Roboto Mono', monospace;
  font-weight: $font-weight-bold;
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-transform: uppercase;
  color: $red-bittersweet;

  &__field {
    border: none;
    outline: none;

    width: 100%;
    margin-top: 1.2rem;
    padding: 0 2.4rem;
    height: 5.6rem;

    background-color: $gray-athensgray;
    border-radius: 0.8rem;

    font-family: 'Roboto', sans-serif;
    font-size: 1.8rem;
    line-height: 2.1rem;

    color: $gray-tuna;

    &::placeholder {
      color: $gray-jumbo;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &--password {
      padding-right: 6rem;
    }
  }

  &__password-visibility-button {
    position: absolute;
    right: 1.6rem;
    top: 50%;
  }
}
</style>
