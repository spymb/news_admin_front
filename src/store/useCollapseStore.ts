import { defineStore } from "pinia";
import { ref } from "vue";

const useCollapseStore = defineStore(
  "collapse",
  () => {
    // state
    const isCollapsed = ref(false);

    // actions
    const switchCollapsed = (bool: boolean) => {
      isCollapsed.value = bool;
    };

    return {
      isCollapsed,
      switchCollapsed,
    };
  },
  {
    persist: true,
  }
);

export default useCollapseStore;
