import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref("");

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    return {
      token,
      setToken,
    };
  },
  {
    persist: true,
  },
);
