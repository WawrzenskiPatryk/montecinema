<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    screeningData: {
      type: Object,
      required: true,
    },
  },
});
</script>

<template>
  <li>
    <br />
    <div>{{ screeningData.title }}</div>
    <div>{{ screeningData.genre.name }}</div>
    <div>{{ screeningData.length }}</div>
    <div>{{ screeningData.poster_url }}</div>
    <div>
      <div v-for="seance in screeningData.seances" :key="seance.id">{{ seance }}</div>
    </div>
    <br />
  </li>
</template>

<style lang="scss" scoped></style>
