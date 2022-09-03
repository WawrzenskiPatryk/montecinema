<script>
import { defineComponent } from 'vue';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import BaseHeading from '@/components/base/BaseHeading.vue';
import LocationPinIcon from '@/assets/icons/location-pin.svg';
import EnvelopeIcon from '@/assets/icons/envelope.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import TwitterIcon from '@/assets/icons/twitter.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import LinkedinIcon from '@/assets/icons/linkedin.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import GithubIcon from '@/assets/icons/github.svg';
import BehanceIcon from '@/assets/icons/behance.svg';
import DribbbleIcon from '@/assets/icons/dribbble.svg';

export default defineComponent({
  components: {
    TheBreadcrumb,
    BaseHeading,
    LocationPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
    GithubIcon,
    BehanceIcon,
    DribbbleIcon,
  },
});
</script>

<template>
  <TheBreadcrumb />
  <section class="contact-page">
    <BaseHeading class="contact-page__title" heading-size="large">Contact us</BaseHeading>
    <div class="contact-page__items">
      <div class="contact-page__map-container">
        <img
          src="../../assets/images/contact-map.png"
          alt="contact-map"
          class="contact-page__map-image"
        />
      </div>

      <div class="contact-page__info-container">
        <div class="contact-page__info-element">
          <LocationPinIcon class="contact-page__info-icon" />
          <span class="contact-page__info-detail">
            Monterail Sp. z o.o. <br />
            ul. Oławska 27-29 <br />
            50-123 Wrocław <br />
            Poland
          </span>
        </div>
        <div class="contact-page__info-element">
          <EnvelopeIcon class="contact-page__info-icon" />
          <span class="contact-page__info-detail">hello@monterail.com</span>
        </div>
        <div class="contact-page__info-element">
          <PhoneIcon class="contact-page__info-icon" />
          <span class="contact-page__info-detail">+48 533 600 136</span>
        </div>
      </div>

      <div class="contact-page__media">
        <TwitterIcon />
        <FacebookIcon />
        <LinkedinIcon />
        <InstagramIcon />
        <GithubIcon />
        <BehanceIcon />
        <DribbbleIcon />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-page {
  @include page-padding;

  &__items {
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 0.8rem;
    overflow: hidden;

    @include screen-min-medium {
      flex-direction: row;
    }
  }

  &__map-container {
    height: 28.4rem;
    overflow: hidden;

    @include screen-min-medium {
      height: 41.2rem;
      width: 100%;
      min-width: 42.4rem;
    }
  }

  &__map-image {
    position: relative;
    height: 100%;
    right: 2.5rem;

    @media (min-width: 425px) {
      min-width: 100%;
      height: initial;
      bottom: calc(9rem - 5vw);
      right: 0;
    }

    @media (min-width: 768px) {
      bottom: calc(15rem - 5vw);
    }

    @include screen-min-medium {
      right: calc(14rem - 8vw);
      bottom: 0;
    }
    @include screen-min-large {
      right: 0;
    }
  }

  &__info-container,
  &__media {
    background-color: $gray-athensgray;
  }

  &__info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2.4rem;
    gap: 4rem;

    @include screen-min-medium {
      padding: 6.4rem;
      width: 100%;
      min-width: 42.4rem;
    }
  }

  &__info-element {
    display: flex;
    gap: 1.6rem;
  }

  &__info-detail {
    flex: 1;
    font-family: 'Roboto Mono', monospace;
    font-weight: $font-weight-regular;
    font-size: 1.8rem;
    line-height: 3.2rem;
    letter-spacing: 0.015em;
    color: $gray-tuna;
  }

  &__media {
    display: flex;
    justify-content: space-between;
    padding: 2.4rem;
    @include screen-min-medium {
      flex-direction: column;
    }
  }
}
</style>
