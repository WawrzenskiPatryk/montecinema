<script>
import { defineComponent } from 'vue';

import ScreeningsListCard from '@/components/screenings/ScreeningsListCard.vue';

export default defineComponent({
  components: {
    ScreeningsListCard,
  },
  props: {
    screenings: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <ul v-if="!areScreeningsLoading" class="screenings-list">
    <ScreeningsListCard
      v-for="screeningData in screenings"
      :key="screeningData.id"
      :screening-data="screeningData"
      class="screening-list__card"
    />
  </ul>
</template>

<style lang="scss" scoped></style>
