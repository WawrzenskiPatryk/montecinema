<script setup lang="ts">
import { ReservationData } from '@/types/data';
import { computed } from 'vue';
import BaseTag from '@/components/base/BaseTag.vue';
import BaseButton from '@/components/base/BaseButton.vue';

const props = defineProps<{
  reservation: ReservationData;
  isPast: boolean;
}>();

const title = computed(() => {
  return props.reservation.movie_title;
});

const ticket = computed(() => {
  return props.reservation.tickets[0];
});

const ticketPrice = computed(() => {
  return parseInt(ticket.value.price);
});

const seat = computed(() => {
  const seat = ticket.value.seat;
  return {
    row: seat[0],
    number: seat.slice(1),
  };
});

const time = computed(() => {
  const date = new Date(props.reservation.seance_datetime);
  const timeString = date.toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return timeString.replaceAll(',', ' —').replace('—', '');
});

const status = computed(() => {
  return props.reservation.status;
});

const reservationData = computed(() => {
  return [
    { id: 0, label: 'movie', content: title.value },
    { id: 1, label: 'seat', content: `Row ${seat.value.row}, Seat ${seat.value.number}` },
    { id: 2, label: 'time', content: time.value },
    { id: 3, label: 'ticket type', content: `${ticket.value.type} — $${ticketPrice.value}` },
  ];
});
</script>

<template>
  <li class="reservation-item">
    <div v-for="data in reservationData" :key="data.id" class="reservation-item__element">
      <span class="reservation-item__element-label">{{ data.label }}</span>
      <span class="reservation-item__element-content">{{ data.content }} </span>
    </div>
    <template v-if="!isPast">
      <div class="reservation-item__status-wrapper">
        <BaseTag :theme="status.id === 1 ? 'gray' : 'red'">{{ status.name }}</BaseTag>
      </div>
      <div class="reservation-item__button-wrapper">
        <BaseButton button-type="hollow-dark">Remove</BaseButton>
      </div>
    </template>
  </li>
</template>

<style lang="scss" scoped>
.reservation-item {
  display: grid;
  grid-template-columns: 20rem 12.5rem 24.5rem 11.5rem 1fr auto;
  margin-bottom: 2.4rem;
  gap: 3.2rem;

  &__element {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  &__status-wrapper,
  &__button-wrapper {
    display: flex;
    align-items: center;
  }

  &__status-wrapper {
    justify-content: center;
  }

  &__element-label {
    display: inline-block;
    font-family: 'Roboto Mono';
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
    color: $red-bittersweet;
    margin-bottom: 0.8rem;
  }

  &__element-content {
    display: inline-block;
  }
}
</style>
