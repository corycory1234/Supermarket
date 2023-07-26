import {defineStore} from "pinia";
import {ref, computed, watch} from "vue";

export default defineStore ("useStepStore", () =>{
  // 數據 (State)
  const step = ref(0);

  return{
    step,
  }
})