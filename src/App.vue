<script>
import DeleteIcon from './assets/icons/delete-2 1.svg';

export default {
  components: {
    DeleteIcon,
  },
};
</script>

<template>
  <p>Test text</p>
  <DeleteIcon class="icon" />
</template>

<style lang="scss">
p {
  & {
    color: red;
  }
}
</style>
