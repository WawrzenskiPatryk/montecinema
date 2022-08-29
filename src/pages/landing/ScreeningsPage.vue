<script>
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { mainStore } from '@/store/index.js';

import TheBreadcrumb from '@/components/TheBreadcrumb.vue';

export default defineComponent({
  components: {
    TheBreadcrumb,
  },
  mounted() {
    // setTimeout(() => {
    //   this.seancesDate = '2022-08-30';
    // }, 5000);
  },
  computed: {
    ...mapState(mainStore, [
      'screenings',
      // 'seancesDate'
    ]),
  },
  methods: {},
});
</script>

<template>
  <TheBreadcrumb />
  <section class="screenings-page">
    <h1>Screenings Page</h1>

    <ul>
      <li v-for="screening in screenings" :key="screening.id">
        {{ screening }}
        <br /><br />
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped></style>
