<script>
import { defineComponent } from 'vue';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';

export default defineComponent({
  components: {
    ArrowRightIcon,
    ArrowLeftIcon,
  },
  props: {
    to: {
      type: [Object, String],
      default: null,
    },
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
    componentType() {
      if (this.$attrs.href) return 'a';
      return this.to !== null ? 'router-link' : 'button';
    },
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
        'base-button--right': this.arrowType === 'right',
        'base-button--left': this.arrowType === 'left',
      };
    },
    iconClasses() {
      return {
        'base-button__icon': true,
        'base-button__icon--right': this.arrowType === 'right',
        'base-button__icon--left': this.arrowType === 'left',
      };
    },
  },
});
</script>

<template>
  <component :is="componentType" :class="buttonClasses" :to="to">
    <ArrowLeftIcon v-if="arrowType === 'left'" :class="iconClasses" />
    <slot>button_label</slot>
    <ArrowRightIcon v-if="arrowType === 'right'" :class="iconClasses" />
  </component>
</template>

<style lang="scss" scoped>
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $padding-small;

  width: fit-content;

  font-family: 'Roboto Mono', monospace;
  text-align: center;
  line-height: 100%;
  text-decoration: none;

  border: $button-border-width solid;
  border-radius: $border-radius-full;
  outline: none;

  user-select: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  transition: transform ease 75ms;

  svg {
    stroke: currentColor;
  }

  &:focus-visible,
  &:active {
    transform: translateY(0.1rem);
  }

  &--right {
    &:focus-visible,
    &:active {
      transform: translateX(0.1rem);
    }
  }

  &--left {
    &:focus-visible,
    &:active {
      transform: translateX(-0.1rem);
    }
  }

  &--filled-red {
    color: $white;
    background-color: $red-cherryred;
    border-color: $red-cherryred;
    font-weight: $font-weight-regular;
    @include button-states($white, $red-totempole, $red-totempole);
  }

  &--hollow-red {
    color: $red-cherryred;
    border-color: $red-cherryred;
    background: none;
    font-weight: $font-weight-medium;
    @include button-states($red-totempole, none, $red-totempole);
  }

  &--hollow-red-faded {
    color: $red-sweetpink;
    border-color: $red-sweetpink;
    background: none;
    font-weight: $font-weight-medium;
    @include button-states($red-bittersweet, none, $red-bittersweet);
  }

  &--filled-dark {
    color: $white;
    background-color: $gray-tuna;
    border-color: $gray-tuna;
    font-weight: $font-weight-regular;
    @include button-states($white, $gray-midgray, $gray-midgray);
  }

  &--hollow-dark {
    color: $gray-tuna;
    border-color: $gray-tuna;
    background: none;
    font-weight: $font-weight-medium;
    @include button-states($gray-jumbo, none, $gray-jumbo);
  }

  &--borderless-red {
    color: $red-cherryred;
    border-color: $transparent;
    background: none;
    font-weight: $font-weight-medium;
    @include button-states($red-totempole, none, $transparent);
  }

  &--large {
    font-size: $font-size-large;
    min-height: $button-height-large;
    padding: 0 $padding-large;
  }
  &--regular {
    font-size: $font-size-regular;
    min-height: $button-height-regular;
    padding: 0 $padding-regular;
  }
  &--medium {
    font-size: $font-size-small;
    min-height: $button-height-medium;
    padding: 0 $padding-medium;
  }
  &--small {
    font-size: $font-size-small;
    min-height: $button-height-small;
    padding: 0 $padding-small;
  }

  &__icon {
    &--right {
      margin-right: -0.8rem;
    }
    &--left {
      margin-left: -0.8rem;
    }
  }

  &:disabled {
    cursor: not-allowed;
    transition: none;
    opacity: 0.4;

    &:focus-visible,
    &:active {
      transform: none;
    }
  }
}
</style>
