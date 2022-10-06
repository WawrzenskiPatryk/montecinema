<script setup lang="ts">
import { ref } from 'vue';
import { useMeta } from 'vue-meta';
import { ReservationData } from '@/types/data';
import { getReservationsData } from '@/services/api/data.js';
import { useUserData } from '@/composables';

const reservationsData = ref<ReservationData[]>([]);
const { currentUserData, setCurrentUserData, handleUserDataError, isUserLoading } = useUserData();
const areReservationsLoading = ref(true);

const getUserReservationsData = async () => {
  isUserLoading.value = true;
  areReservationsLoading.value = true;
  try {
    await setCurrentUserData();
    reservationsData.value = await getReservationsData(currentUserData.value?.email, 1, 200);
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
  <div v-else>
    <div v-for="reservation in reservationsData" :key="reservation.id">
      Movie: {{ reservation.movie_title }} <br />
      Tickets: {{ reservation.tickets }} <br />
      Seance datetime: {{ reservation.seance_datetime }} <br />
      Status: {{ reservation.status }} <br />
      <br /><br />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
