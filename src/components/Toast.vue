<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true"
  ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block">
      </span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <br>
      <strong class="me-auto">{{ msg.category }}</strong>
      <br>
      <strong class="me-auto">{{ msg.unit }}</strong>
      <br>
      <strong class="me-auto">{{ msg.origin_price }}</strong>
      <br>
      <strong class="me-auto">{{ msg.price }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast"
      aria-label="Close"></button>
    </div>

    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
</div>
</template>

<script setup>
import Toast from "bootstrap/js/dist/toast.js";
import {ref, onMounted} from "vue";

const props = defineProps(["msg"]);
const toast = ref(); //取DOM
onMounted(() => {
  const toastModal = new Toast(toast.value, {
    delay: 5000
  });
  toastModal.show();
});
</script>