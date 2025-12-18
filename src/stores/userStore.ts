import { defineStore } from 'pinia';
import { ref } from 'vue';

import { fetchCurrentUser } from '@/services/userService';
import type { User } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadUser() {
    if (user.value) {return;}

    loading.value = true;
    error.value = null;
    try {
      user.value = await fetchCurrentUser();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load user';
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    error,
    loadUser,
  };
});

