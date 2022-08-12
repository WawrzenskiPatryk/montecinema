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
  methods: {
    clickHandler() {
      this.$emit('btnClick');
    },
    hoverHandler(action) {
      if (action === 'enter') this.isHover = true;
      if (action === 'leave') this.isHover = false;
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
      const isFilled = this.buttonType === 'filled-red' || this.buttonType === 'filled-dark';
      const isHollowRedOrBorderless =
        this.buttonType === 'hollow-red' || this.buttonType === 'borderless-red';
      const isHollowFaded = this.buttonType === 'hollow-red-faded';
      const isHollowDark = this.buttonType === 'hollow-dark';

      if (this.isHover) {
        if (isHollowRedOrBorderless) return '#a60c0e';
        if (isHollowFaded) return '#f47073';
        if (isHollowDark) return '#85868d';
      }
      if (isFilled) return '#ffffff';
      if (isHollowRedOrBorderless) return '#ec1115';
      if (isHollowFaded) return '#f7a0a1';
      if (isHollowDark) return '#343541';
      else return '#ffffff';
    },
  },
});
</script>

<template>
  <button
    :class="buttonClasses"
    @click="clickHandler"
    @mouseenter="hoverHandler('enter')"
    @mouseleave="hoverHandler('leave')"
  >
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

  // &,
  &--filled-red {
    color: #ffffff;
    background-color: #ec1115;
    border: 2px solid #ec1115;
    font-weight: 400;

    @media (hover: hover) {
      &:hover {
        background-color: #a60c0e;
        border: 2px solid #a60c0e;
      }
    }
  }
  &--hollow-red {
    color: #ec1115;
    border: 2px solid #ec1115;
    background: none;
    font-weight: 500;
    @media (hover: hover) {
      &:hover {
        color: #a60c0e;
        border: 2px solid #a60c0e;
      }
    }
  }
  &--hollow-red-faded {
    color: #f7a0a1;
    border: 2px solid #f7a0a1;
    background: none;
    font-weight: 500;
    @media (hover: hover) {
      &:hover {
        color: #f47073;
        border: 2px solid #f47073;
      }
    }
  }
  &--filled-dark {
    color: #ffffff;
    background-color: #343541;
    border: 2px solid #343541;
    font-weight: 400;
    @media (hover: hover) {
      &:hover {
        background-color: #5d5d67;
        border: 2px solid #5d5d67;
      }
    }
  }
  &--hollow-dark {
    color: #343541;
    border: 2px solid #343541;
    background: none;
    font-weight: 500;
    @media (hover: hover) {
      &:hover {
        color: #85868d;
        border: 2px solid #85868d;
      }
    }
  }
  &--borderless-red {
    color: #ec1115;
    border: 2px solid #00000000;
    background: none;
    font-weight: 500;
    @media (hover: hover) {
      &:hover {
        color: #a60c0e;
      }
    }
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
