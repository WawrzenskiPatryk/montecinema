<script setup>
import { ref, computed } from 'vue';
import { getUserData } from '@/services/api/data.js';
import { updateUser } from '@/services/api/auth';
import { useMainStore } from '@/store/index';
import { useAuthStore } from '@/store/auth';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import PasswordInput from '@/components/input/PasswordInput.vue';
import DateInput from '@/components/input/DateInput.vue';

const mainStore = useMainStore();
const auth = useAuthStore();

const isLoading = ref(true);
const isNewPasswordTriggered = ref(false);

const email = ref('');
const firstName = ref('');
const lastName = ref('');
const dateOfBirth = ref('');
const currentPassword = ref('');
const newPassword = ref('');

let currentUserData = null;

const isSubmitDisabled = computed(() => {
  const isNoDataChanged =
    email.value === currentUserData.email &&
    firstName.value === currentUserData.first_name &&
    lastName.value === currentUserData.last_name &&
    dateOfBirth.value === currentUserData.date_of_birth &&
    newPassword.value.length === 0;

  return isNoDataChanged || currentPassword.value.length === 0;
});

const handleError = error => {
  if (error.response.status === 401) {
    auth.logout();
    mainStore.leaveRoute('LoginPage');
  } else if (error.response.status === 422) {
    const wrongDataError = new Error('Please provide correct data');
    mainStore.showError(wrongDataError);
  } else {
    mainStore.showError(error);
  }
};

const triggerNewPasswordField = () => {
  isNewPasswordTriggered.value = true;
};

const setValues = () => {
  email.value = currentUserData.email;
  firstName.value = currentUserData.first_name;
  lastName.value = currentUserData.last_name;
  dateOfBirth.value = currentUserData.date_of_birth;
  currentPassword.value = '';
  newPassword.value = '';
  isNewPasswordTriggered.value = false;
  isLoading.value = false;
};

const getCurrentUserData = async () => {
  isLoading.value = true;
  try {
    currentUserData = await getUserData();
  } catch (error) {
    handleError(error);
  } finally {
    setValues();
  }
};

const onSubmit = () => {
  isLoading.value = true;
  try {
    updateUser({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      currentPassword: currentPassword.value,
      password: newPassword.value,
    });
  } catch (error) {
    handleError(error);
  } finally {
    getCurrentUserData();
  }
};

getCurrentUserData();
</script>

<template>
  <div v-if="isLoading">
    <!-- todo spinner -->
    <h1>Loading...</h1>
  </div>
  <form v-else @submit.prevent="onSubmit" class="user-details-form">
    <BaseInput
      required
      type="email"
      placeholder="Something ending with monterail.com"
      label="Email"
      v-model="email"
    />
    <PasswordInput
      required
      v-model="currentPassword"
      :label="isNewPasswordTriggered ? 'Current password' : 'Password'"
      :placeholder="
        isNewPasswordTriggered ? 'Enter current password' : 'Enter password to confirm changes'
      "
    />
    <PasswordInput
      v-if="isNewPasswordTriggered"
      required
      v-model="newPassword"
      label="New password"
      placeholder="Enter new password"
    />
    <BaseButton
      v-if="!isNewPasswordTriggered"
      @click="triggerNewPasswordField"
      button-type="hollow-red"
      size="regular"
      type="button"
    >
      Change password
    </BaseButton>
    <BaseInput
      required
      type="text"
      placeholder="e.g. Jessica"
      label="First Name"
      v-model="firstName"
    />
    <BaseInput
      required
      v-model="lastName"
      type="text"
      placeholder="e.g. Walton"
      label="Last Name"
    />
    <DateInput required v-model="dateOfBirth" label="Date of Birth" placeholder="DD / MM / YYYY" />
    <BaseButton
      :disabled="isSubmitDisabled"
      type="submit"
      button-type="hollow-red"
      size="large"
      class="user-details-form__submit-button"
    >
      Save changes
    </BaseButton>
  </form>
</template>

<style lang="scss" scoped>
.user-details-form {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 47.2rem;

  &__submit-button {
    margin-top: 4rem;
    width: 100%;
  }
}
</style>
