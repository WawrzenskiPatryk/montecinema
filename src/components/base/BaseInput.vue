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
      isdateInputText: false,
    };
  },
  updated() {
    if (this.type === 'date' && this.modelValue.length > 0) {
      this.isdateInputText = true;
    }
  },
  computed: {
    computedType() {
      if (this.type === 'date' && !this.isdateInputText) {
        return 'text';
      } else return this.type;
    },
    inputClass() {
      return {
        'input__field--has-specific-element': !!this.$slots.default,
      };
    },
  },
  methods: {
    touchHandler(event) {
      const isDateInputFocused = this.type === 'date' && event.type === 'focus';
      const isDateInputBlured = this.type === 'date' && event.type === 'blur';
      const isInputEmpty = !event.target.value;

      if (isDateInputFocused) {
        this.isdateInputText = true;
      } else if (isDateInputBlured && isInputEmpty) {
        this.isdateInputText = false;
      }
    },
  },
});
</script>

<template>
  <div class="input">
    <label class="input__label">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      :required="required"
      :type="computedType"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="touchHandler"
      @blur="touchHandler"
      :class="inputClass"
      class="input__field"
    />
    <div class="input__specific-element">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: inline-block;
  position: relative;

  &__label {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-bold;
    font-size: 1.4rem;
    line-height: 1.8rem;
    text-transform: uppercase;
    color: $red-bittersweet;
  }

  &__field {
    border: none;
    outline: none;

    width: 100%;
    margin-top: 1.2rem;
    padding: 0 2.4rem;
    height: 5.6rem;

    background-color: $gray-athensgray;
    border-radius: 0.8rem;

    font-size: 1.8rem;
    line-height: 2.1rem;

    color: $gray-tuna;

    @include hover {
      background-color: $gray-basic;
    }

    &:focus-visible,
    &:active {
      background-color: $white-blue;
      border: 1px solid $blue-dodger;
      padding-left: 2.3rem;
    }

    &::placeholder {
      color: $gray-jumbo;
      user-select: none;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }

    &--has-specific-element {
      padding-right: 6rem;
    }
  }

  &__specific-element {
    position: absolute;
    right: 1.6rem;
    top: 52%;
  }
}
</style>
