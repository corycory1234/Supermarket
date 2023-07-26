<template>
  <ul class="step-guide">
    <li v-for="(btn, index) in buttonArr" :key="index" :class="{'step-confirm-color' : btn.step <= step }" class="step-style">
      <i :class="btn.icon"></i>
      <span>{{ btn.title }}</span>
      
    </li>
    <!-- <li><i class="bi bi-bag-check-fill"></i>確認商品</li>
    <li><i class="bi bi-pencil-fill"></i>收貨資訊</li>
    <li class="step-confirm-color"><i class="bi bi-currency-dollar"></i>確認付款</li> -->
  </ul>
</template>

<script setup>
import { ref, defineExpose } from "vue";
const buttonArr = ref([
  {
    title: "確認商品",
    icon: "bi bi-1-circle-fill",
    path: "/cart1",
    step: 0
  },
  {
    title: "收貨資訊",
    icon: "bi bi-2-circle-fill",
    path: "/cart2",
    step: 1
  },
  {
    title: "確認付款",
    icon: "bi bi-3-circle-fill",
    path: "/cart3",
    step: 2,
  }
])

// 下一步
const nextStep = () => {
  if (step.value === 2) {
    return;
  }
  step.value ++;
};
// 上一步
const preStep = () => {
  if (step.value ===0){
    return;
  };
  step.value --;
}


// Pinia
import UseStepStore from "../stores/stepStore.js";
import { storeToRefs } from "pinia";
const stepStore = UseStepStore();
const {step} = storeToRefs(stepStore);

defineExpose({nextStep, preStep});
</script>

<style scoped>
.step-container {
  margin: auto;
  max-width: 1200px;
  padding: 30px 0;
}
.step-guide {
    display: flex;
    justify-content: space-evenly;
    font-size: 1.6rem;
    padding: 0;
}
.step-guide li {
  /* padding-right: 10px; */
  padding: 0 10px;
}

.step-style {
  background-color: gray;
  border-radius: 5px;
}

.step-confirm-color {
  color:#fff;
  background-color: rgb(34,187,51);;
}

/** ICON與文字距離 */
.bi {
  padding-right: 5px;
}

@media (max-width: 414px) {
  .step-style {
    font-size: .9rem;
  }
}
</style>