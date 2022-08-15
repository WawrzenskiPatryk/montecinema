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
  data() {
    return {
      isHover: false,
    };
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
  },
});
</script>

<template>
  <button :class="buttonClasses" @click="this.$emit('btnClick')">
    <ArrowLeftIcon v-if="arrowType === 'left'" :class="iconClasses" />
    <slot>button_label</slot>
    <ArrowRightIcon v-if="arrowType === 'right'" :class="iconClasses" />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  // TODO: active & focus states & similar
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $padding-small;

  font-family: 'Roboto Mono', monospace;

  border: $button-border-width solid;
  border-radius: $border-radius-full;
  outline: none;

  user-select: none;
  cursor: pointer;

  transition: transform ease 75ms;

  &:focus-visible,
  &:active {
    transform: translateY(0.2rem);
  }

  &--right {
    &:focus-visible,
    &:active {
      transform: translateX(0.2rem);
    }
  }

  &--left {
    &:focus-visible,
    &:active {
      transform: translateX(-0.2rem);
    }
  }

  &--filled-red {
    color: $white;
    background-color: $red-cherryred;
    border-color: $red-cherryred;
    font-weight: $font-weight-regular;

    svg {
      stroke: $white;
    }

    @media (hover: hover) {
      &:hover {
        background-color: $red-totempole;
        border-color: $red-totempole;
      }
    }
  }

  &--hollow-red {
    color: $red-cherryred;
    border-color: $red-cherryred;
    background: none;
    font-weight: $font-weight-medium;

    svg {
      stroke: $red-cherryred;
    }

    @media (hover: hover) {
      &:hover {
        color: $red-totempole;
        border-color: $red-totempole;
        svg {
          stroke: $red-totempole;
        }
      }
    }
  }

  &--hollow-red-faded {
    color: $red-sweetpink;
    border-color: $red-sweetpink;
    background: none;
    font-weight: $font-weight-medium;

    svg {
      stroke: $red-sweetpink;
    }

    @media (hover: hover) {
      &:hover {
        color: $red-bittersweet;
        border-color: $red-bittersweet;
        svg {
          stroke: $red-bittersweet;
        }
      }
    }
  }

  &--filled-dark {
    color: $white;
    background-color: $gray-tuna;
    border-color: $gray-tuna;
    font-weight: $font-weight-regular;

    svg {
      stroke: $white;
    }

    @media (hover: hover) {
      &:hover {
        background-color: $gray-midgray;
        border-color: $gray-midgray;
      }
    }
  }

  &--hollow-dark {
    color: $gray-tuna;
    border-color: $gray-tuna;
    background: none;
    font-weight: $font-weight-medium;

    svg {
      stroke: $gray-tuna;
    }

    @media (hover: hover) {
      &:hover {
        color: $gray-jumbo;
        border-color: $gray-jumbo;
        svg {
          stroke: $gray-jumbo;
        }
      }
    }
  }

  &--borderless-red {
    color: $red-cherryred;
    border-color: $transparent;
    background: none;
    font-weight: $font-weight-medium;

    svg {
      stroke: $red-cherryred;
    }

    @media (hover: hover) {
      &:hover {
        color: $red-totempole;
        svg {
          stroke: $red-totempole;
        }
      }
    }
  }

  &--large {
    font-size: $font-size-large;
    height: $button-height-large;
    padding: 0 $padding-large;
  }
  &--regular {
    font-size: $font-size-regular;
    height: $button-height-regular;
    padding: 0 $padding-regular;
  }
  &--medium {
    font-size: $font-size-small;
    height: $button-height-medium;
    padding: 0 $padding-medium;
  }
  &--small {
    font-size: $font-size-small;
    height: $button-height-small;
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
}
</style>
