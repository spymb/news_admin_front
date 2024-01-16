import { defineStore } from "pinia";
import { ref } from "vue";

const useAuthStore = defineStore("auth", () => {
  // state
  const isRouterConfigured = ref(false);

  // actions
  const switchRouterConfig = (bool: boolean) => {
    isRouterConfigured.value = bool;
  };

  return {
    isRouterConfigured,
    switchRouterConfig,
  };
});

export default useAuthStore;
