<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMeta } from 'vue-meta';
import { ReservationData } from '@/types/data';
import { getReservationsData } from '@/services/api/data.js';
import { useUserData } from '@/composables/user';
import UserReservationsListItem from './UserReservationsListItem.vue';

const reservationsData = ref<ReservationData[]>([]);
const { currentUserData, loadCurrentUserData, handleUserDataError, isUserLoading } = useUserData();
const areReservationsLoading = ref(true);

const groupedReservations = computed(() => {
  const now = new Date();
  const groupedReservations = {
    upcoming: [] as ReservationData[],
    past: [] as ReservationData[],
  };
  reservationsData.value.forEach(reservation => {
    const reservationTime = new Date(reservation.seance_datetime);
    if (reservationTime >= now) {
      groupedReservations.upcoming.push(reservation);
    } else {
      groupedReservations.past.push(reservation);
    }
  });
  return groupedReservations;
});

const getUserReservationsData = async () => {
  isUserLoading.value = true;
  areReservationsLoading.value = true;
  try {
    await loadCurrentUserData();
    reservationsData.value = await getReservationsData(currentUserData.value?.email, 1, 1000);
  } catch (error) {
    handleUserDataError(error);
  } finally {
    isUserLoading.value = false;
    areReservationsLoading.value = false;
  }
};

useMeta({ title: 'Reservations' });
getUserReservationsData();
</script>

<template>
  <div v-if="areReservationsLoading">
    <!-- todo spinner -->
    <h1>Loading...</h1>
  </div>
  <div v-else class="reservations">
    <h3 class="reservations__group-heading">Upcoming</h3>
    <ul class="reservations__grouped-list">
      <UserReservationsListItem
        v-for="reservation in groupedReservations.upcoming"
        :key="reservation.id"
        :reservation="reservation"
      />
    </ul>
    <h3 class="reservations__group-heading">Past</h3>
    <ul class="reservations__grouped-list">
      <!-- todo: dynamic reservations filtering by amount -->
      <UserReservationsListItem
        v-for="reservation in groupedReservations.past.slice(0, 4)"
        :key="reservation.id"
        :reservation="reservation"
      />
      <!---------->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.reservations {
  &__group-heading {
    font-family: 'Eczar';
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 102%;
    letter-spacing: -0.01em;
    color: $gray-tuna;
    margin: 0;
    margin-bottom: 4rem;

    &:not(:first-child) {
      margin-top: 8rem;
    }
  }

  &__grouped-list {
    list-style-type: none;
  }
}
</style>
