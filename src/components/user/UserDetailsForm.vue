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
      isPasswordTriggered: false,
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
      this.isPasswordTriggered = false;
      this.newPassword = '';
      this.currentPassword = '';
    },
  },
  computed: {
    isSubmitDisabled() {
      return (
        this.email === this.userData.email &&
        this.firstName === this.userData.first_name &&
        this.lastName === this.userData.last_name &&
        this.dateOfBirth === this.userData.date_of_birth &&
        this.isPasswordTriggered === false
      );
    },
  },
});
</script>

<template>
  <!-- todo -->
  <form @submit.prevent="onSubmit">
    <!-- <UserDetailsFormCard>  -->
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
      label="Current password"
      placeholder="Enter your password"
    />
    <BaseInput
      v-if="isPasswordTriggered"
      required
      v-model="newPassword"
      type="password"
      label="New password"
      placeholder="Enter new password"
    />
    <BaseButton
      v-else
      @click="isPasswordTriggered = true"
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

    <BaseButton :disabled="isSubmitDisabled" type="submit" button-type="hollow-red" size="large">
      Save changes
    </BaseButton>
  </form>
  <!-- </UserDetailsFormCard> -->
</template>

<style lang="scss" scoped></style>
