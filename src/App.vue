<script>
import { defineComponent } from 'vue';

import BaseButton from '@/components/BaseButton.vue';

export default defineComponent({
  components: {
    BaseButton,
  },
  methods: {
    testClickHandler() {
      console.log('Test positive');
    },
  },
});
</script>

<template>
  <div class="test-wrapper">
    <div>
      <BaseButton size="large"> Book a ticket </BaseButton>
      <br />
      <BaseButton @btn-click="testClickHandler"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right"> Book a ticket </BaseButton>
      <br />
      <BaseButton arrow-type="right"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left"> Book a ticket </BaseButton>
      <br />
      <BaseButton arrow-type="left"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left"> Book a ticket </BaseButton>
    </div>

    <div>
      <BaseButton size="large" button-type="hollow-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="regular" button-type="hollow-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" button-type="hollow-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" button-type="hollow-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="right" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="left" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left" button-type="hollow-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left" button-type="hollow-red">
        Book a ticket
      </BaseButton>
    </div>

    <div>
      <BaseButton size="large" button-type="hollow-red-faded"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="regular" button-type="hollow-red-faded"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" button-type="hollow-red-faded"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" button-type="hollow-red-faded"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="right" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="left" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left" button-type="hollow-red-faded">
        Book a ticket
      </BaseButton>
    </div>

    <div>
      <BaseButton size="large" button-type="filled-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="regular" button-type="filled-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" button-type="filled-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" button-type="filled-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="right" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="left" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left" button-type="filled-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left" button-type="filled-dark">
        Book a ticket
      </BaseButton>
    </div>

    <div>
      <BaseButton size="large" button-type="hollow-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="regular" button-type="hollow-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" button-type="hollow-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" button-type="hollow-dark"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="right" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="left" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left" button-type="hollow-dark">
        Book a ticket
      </BaseButton>
    </div>

    <div>
      <BaseButton size="large" button-type="borderless-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="regular" button-type="borderless-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="medium" button-type="borderless-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="small" button-type="borderless-red"> Book a ticket </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="right" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="right" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="right" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="right" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="large" arrow-type="left" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="regular" arrow-type="left" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="medium" arrow-type="left" button-type="borderless-red">
        Book a ticket
      </BaseButton>
      <br />
      <BaseButton size="small" arrow-type="left" button-type="borderless-red">
        Book a ticket
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss">
.test-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10rem;
  margin: 4rem 5rem;
}
</style>
