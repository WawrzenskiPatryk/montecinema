<script>
import { defineComponent } from 'vue';

import BaseHeading from '@/components/base/BaseHeading.vue';
import LocationPinIcon from '@/assets/icons/location-pin.svg';
import EnvelopeIcon from '@/assets/icons/envelope.svg';
import PhoneIcon from '@/assets/icons/phone.svg';

export default defineComponent({
  components: {
    BaseHeading,
    LocationPinIcon,
    EnvelopeIcon,
    PhoneIcon,
  },
});
</script>

<template>
  <section class="contact-panel">
    <BaseHeading class="contact-panel__title" heading-size="medium">Contact us</BaseHeading>
    <div class="contact-panel__info-container">
      <div class="contact-panel__info-element">
        <LocationPinIcon class="contact-panel__info-icon" />
        <span class="contact-panel__info-detail">
          Monterail Sp. z o.o. <br />
          ul. Oławska 27-29 <br />
          50-123 Wrocław <br />
          Poland
        </span>
      </div>
      <div class="contact-panel__info-element">
        <EnvelopeIcon class="contact-panel__info-icon" />
        <span class="contact-panel__info-detail">hello@monterail.com</span>
      </div>
      <div class="contact-panel__info-element">
        <PhoneIcon class="contact-panel__info-icon" />
        <span class="contact-panel__info-detail">+48 533 600 136</span>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.2rem;
  padding-bottom: 8rem;
  gap: 4.8rem;

  @include screen-min-medium {
    padding: 12.4rem;
  }

  &__info-container {
    background-color: $gray-athensgray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.4rem 1.7rem 2.4rem 2.4rem;
    gap: 4rem;
    border-radius: 2.4rem;
    width: 31.1rem;

    @include screen-min-medium {
      padding: 6.4rem;
      width: 60rem;
    }
  }

  &__info-element {
    display: flex;
    gap: 1.6rem;
  }

  &__info-detail {
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-regular;
    font-size: 1.8rem;
    line-height: 3.2rem;
    letter-spacing: 0.015em;
    color: $gray-tuna;
  }
}
</style>
