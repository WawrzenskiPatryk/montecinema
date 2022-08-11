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
  <DeleteIcon class="icon" viewBox="0 0 32 32" />
</template>

<style lang="scss">
p {
  font-size: 2rem;
}
.icon {
  border: 1px solid red;
  height: 10rem;
  width: 10rem;
}
</style>
