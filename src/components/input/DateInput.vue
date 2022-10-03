<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isTypeDate = ref(false);

const computedType = computed(() => {
  if (isTypeDate.value) return 'date';
  else return 'text';
});

const onTouch = (event: Event): void => {
  const eventTarget = event.target as HTMLInputElement;
  if (event.type === 'focus') isTypeDate.value = true;
  else if (!eventTarget.value) isTypeDate.value = false;
};

const onUpdate = (value: string): void => {
  if (value) isTypeDate.value = true;
  emit('update:modelValue', value);
};

onUpdated(() => {
  onUpdate(props.modelValue);
});
</script>

<template>
  <BaseInput
    :model-value="modelValue"
    :type="computedType"
    @update:model-value="onUpdate"
    @input-touch="onTouch"
  />
</template>
