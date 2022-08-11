<script>
import { defineComponent } from 'vue';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default defineComponent({
  name: 'BaseButton',
  components: {
    ArrowRightIcon,
    ArrowLeftIcon,
  },
  props: {
    size: {
      type: String,
      default: 'regular',
      validator(value) {
        return ['small', 'medium', 'regular', 'large'].includes(value);
      },
    },
    buttonType: {
      type: String,
      default: 'filled-red',
      validator(value) {
        return [
          'filled-red',
          'hollow-red',
          'hollow-red-faded',
          'filled-dark',
          'hollow-dark',
          'borderless-red',
        ].includes(value);
      },
    },
    arrowType: {
      type: String,
      default: 'none',
      validator(value) {
        return ['none', 'right', 'left'].includes(value);
      },
    },
  },
  computed: {
    buttonClasses() {
      return {
        'base-button': true,
        'base-button--large': this.size === 'large',
        'base-button--regular': this.size === 'regular',
        'base-button--medium': this.size === 'medium',
        'base-button--small': this.size === 'small',
        'base-button--filled-red': this.buttonType === 'filled-red',
        'base-button--hollow-red': this.buttonType === 'hollow-red',
        'base-button--hollow-red-faded': this.buttonType === 'hollow-red-faded',
        'base-button--filled-dark': this.buttonType === 'filled-dark',
        'base-button--hollow-dark': this.buttonType === 'hollow-dark',
        'base-button--borderless-red': this.buttonType === 'borderless-red',
      };
    },
    iconClasses() {
      return {
        'base-button__icon': true,
        'base-button__icon--right': this.arrowType === 'right',
        'base-button__icon--left': this.arrowType === 'left',
      };
    },
    iconColor() {
      if (this.buttonType === 'filled-red' || this.buttonType === 'filled-dark') return '#ffffff';
      if (this.buttonType === 'hollow-red' || this.buttonType === 'borderless-red')
        return '#ec1115';
      if (this.buttonType === 'hollow-red-faded') return '#f7a0a1';
      if (this.buttonType === 'hollow-dark') return '#343541';
      else return '#ffffff';
    },
  },
});
</script>

<template>
  <button :class="buttonClasses">
    <ArrowLeftIcon v-if="arrowType === 'left'" :class="iconClasses" :stroke="iconColor" />
    <slot>button_label</slot>
    <ArrowRightIcon v-if="arrowType === 'right'" :class="iconClasses" :stroke="iconColor" />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  // TODO: REFACTOR SCSS VARIABLES

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;

  font-family: 'Roboto Mono', monospace;

  border-radius: 6.4rem;

  cursor: pointer;
  user-select: none;

  &,
  &--filled-red {
    color: #ffffff;
    background-color: #ec1115;
    border: 2px solid #ec1115;
    font-weight: 400;
  }
  &--hollow-red {
    color: #ec1115;
    border: 2px solid #ec1115;
    background: none;
    font-weight: 500;
  }
  &--hollow-red-faded {
    color: #f7a0a1;
    border: 2px solid #f7a0a1;
    background: none;
    font-weight: 500;
  }
  &--filled-dark {
    color: #ffffff;
    background-color: #343541;
    border: 2px solid #ffffff;
    font-weight: 400;
  }
  &--hollow-dark {
    color: #343541;
    border: 2px solid #343541;
    background: none;
    font-weight: 500;
  }
  &--borderless-red {
    color: #ec1115;
    border: 2px solid #00000000;
    background: none;
    font-weight: 500;
  }

  &--large {
    font-size: 1.8rem;
    height: 5.6rem;
    padding: 0 4rem;
  }
  &--regular {
    font-size: 1.6rem;
    height: 4rem;
    padding: 0 3.2rem;
  }
  &--medium {
    font-size: 1.4rem;
    height: 3.2rem;
    padding: 0 2.4rem;
  }
  &--small {
    font-size: 1.4rem;
    height: 2.4rem;
    padding: 0 1.6rem;
  }

  &__icon {
    &--right {
      margin-right: -0.8rem;
    }
    &--left {
      margin-left: -0.8rem;
    }
  }
}
</style>
