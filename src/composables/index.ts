import { ref } from 'vue';
import { useMainStore } from '@/store/index';
import { useAuthStore } from '@/store/auth';
import { UserData } from '@/types/data';
import { getUserData } from '@/services/api/data.js';

const mainStore = useMainStore();
const auth = useAuthStore();
const isUserLoading = ref(true);
const currentUserData = ref<UserData | null>(null);

export const useUserData = () => {
  // TODO: error type
  const handleUserDataError = (error: any) => {
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

  const setCurrentUserData = async () => {
    try {
      currentUserData.value = await getUserData();
    } catch (error) {
      handleUserDataError(error);
    }
  };

  return {
    isUserLoading,
    currentUserData,
    setCurrentUserData,
    handleUserDataError,
  };
};
