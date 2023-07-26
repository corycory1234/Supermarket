<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages"
    :key="key" :msg="msg">
    </Toast>
  </div>
</template>

<script setup>
import Toast from "./Toast.vue";
import {ref, inject, onMounted} from "vue";
const messages = ref([]);
const emitter = inject("emitter");

onMounted(() => {
  emitter.on("push-message", (message) => {
    const {style = 'success', title, content, category, unit, price} = message;
    messages.value.push({style, title, content, category, unit, price});
  })
})
</script>