<script>
import { defineComponent } from 'vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: {
    BaseInput,
    BaseButton,
  },
  props: {
    userData: {
      type: Object,
    },
  },
  mounted() {
    this.email = this.userData.email;
    this.firstName = this.userData.first_name;
    this.lastName = this.userData.last_name;
    this.dateOfBirth = this.userData.date_of_birth;
  },
  data() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      currentPassword: '',
      newPassword: '',
      isNewPasswordTriggered: false,
    };
  },
  methods: {
    onSubmit() {
      this.$emit('user-data-update', {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateOfBirth,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
      });
      this.isNewPasswordTriggered = false;
      this.newPassword = '';
      this.currentPassword = '';
    },
  },
  computed: {
    isSubmitDisabled() {
      const isNoDataChanged =
        this.email === this.userData.email &&
        this.firstName === this.userData.first_name &&
        this.lastName === this.userData.last_name &&
        this.dateOfBirth === this.userData.date_of_birth &&
        this.newPassword.length === 0;

      return isNoDataChanged || this.currentPassword.length === 0;
    },
  },
});
</script>

<template>
  <!-- todo -->
  <form @submit.prevent="onSubmit" class="user-details-form">
    <BaseInput
      required
      type="email"
      placeholder="Something ending with monterail.com"
      label="Email"
      v-model="email"
    />
    <BaseInput
      required
      v-model="currentPassword"
      type="password"
      :label="isNewPasswordTriggered ? 'Current password' : 'Password'"
      :placeholder="
        isNewPasswordTriggered ? 'Enter current password' : 'Enter password to confirm changes'
      "
    />
    <BaseInput
      v-if="isNewPasswordTriggered"
      required
      v-model="newPassword"
      type="password"
      label="New password"
      placeholder="Enter new password"
    />
    <BaseButton
      v-if="!isNewPasswordTriggered"
      @click="isNewPasswordTriggered = true"
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
    <BaseInput
      required
      v-model="dateOfBirth"
      type="date"
      label="Date of Birth"
      placeholder="DD / MM / YYYY"
    />
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
