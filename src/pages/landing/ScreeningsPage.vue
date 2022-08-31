<script>
import { defineComponent } from 'vue';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';
import ScreeningsPanel from '@/components/screenings/ScreeningsPanel.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
    ScreeningsPanel,
  },
});
</script>

<template>
  <TheBreadcrumb />
  <ScreeningsPanel/>
</template>

<style lang="scss" scoped>
.screenings-page {
  @include page-padding;
}
</style>
