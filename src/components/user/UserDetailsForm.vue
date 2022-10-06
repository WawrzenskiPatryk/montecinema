<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMeta } from 'vue-meta';
import { updateUser } from '@/services/api/auth';
import { useUserData } from '@/composables';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import PasswordInput from '@/components/input/PasswordInput.vue';
import DateInput from '@/components/input/DateInput.vue';

const { currentUserData, setCurrentUserData, handleUserDataError, isUserLoading } = useUserData();

const isNewPasswordField = ref(false);
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const dateOfBirth = ref('');
const currentPassword = ref('');
const newPassword = ref('');

const isSubmitDisabled = computed(() => {
  const isNoDataChanged =
    email.value === currentUserData.value?.email &&
    firstName.value === currentUserData.value?.first_name &&
    lastName.value === currentUserData.value?.last_name &&
    dateOfBirth.value === currentUserData.value?.date_of_birth &&
    newPassword.value.length === 0;

  return isNoDataChanged || currentPassword.value.length === 0;
});

const showNewPasswordField = () => {
  isNewPasswordField.value = true;
};

const setFormValues = async () => {
  isUserLoading.value = true;
  await setCurrentUserData();
  if (currentUserData.value !== null) {
    email.value = currentUserData.value.email;
    firstName.value = currentUserData.value.first_name;
    lastName.value = currentUserData.value.last_name;
    dateOfBirth.value = currentUserData.value.date_of_birth;
  }
  currentPassword.value = '';
  newPassword.value = '';
  isNewPasswordField.value = false;
  isUserLoading.value = false;
};

const onSubmit = async () => {
  isUserLoading.value = true;
  try {
    await updateUser({
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      dateOfBirth: dateOfBirth.value,
      currentPassword: currentPassword.value,
      password: newPassword.value,
    });
  } catch (error) {
    handleUserDataError(error);
  } finally {
    setFormValues();
  }
};

useMeta({ title: 'Personal Details' });
setFormValues();
</script>

<template>
  <div v-if="isUserLoading">
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
      :label="isNewPasswordField ? 'Current password' : 'Password'"
      :placeholder="
        isNewPasswordField ? 'Enter current password' : 'Enter password to confirm changes'
      "
    />
    <PasswordInput
      v-if="isNewPasswordField"
      required
      v-model="newPassword"
      label="New password"
      placeholder="Enter new password"
    />
    <BaseButton
      v-if="!isNewPasswordField"
      @click="showNewPasswordField"
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
