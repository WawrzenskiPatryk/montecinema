<script setup lang="ts">
import { ref } from 'vue';
import { useMeta } from 'vue-meta';
import { ReservationData, UserData } from '@/types/data';
import { getReservationsData, getUserData } from '@/services/api/data.js';

const isLoading = ref(true);

const reservationsData = ref<ReservationData[]>([]);

const getCurrentUserData = async (): Promise<UserData> => {
  isLoading.value = true;
  let userData;
  try {
    userData = await getUserData();
  } catch (error) {
    console.log(error);
  }
  return userData;
};

const getUserReservationsData = async () => {
  isLoading.value = true;
  try {
    const currentUserData = await getCurrentUserData();
    reservationsData.value = await getReservationsData(currentUserData.email, 1, 200);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

useMeta({ title: 'Reservations' });
getUserReservationsData();
</script>

<template>
  <div v-if="isLoading">
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
