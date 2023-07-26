import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore ("UseStatusStore", () => {
  const isLoading = ref(false);

  return { isLoading };
})