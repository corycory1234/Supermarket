<template>
  <UserNav></UserNav>
  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link :to="{name: 'home'}">
        <button type="button" class="btn btn-primary">回首頁<a href="/"></a></button>
      </router-link>

      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
    </div>
  </nav> -->
  <div class="container-fluid mt-5 position-relative">
    <ToastMessages></ToastMessages>
  </div>
  
  <router-view/>
</template>

<script setup>
import emitter from "../mitt/emitter.js";
import ToastMessages from "../components/ToastMessages.vue";
import { provide } from "vue";
import UserNav from "../components/UserNav.vue"

// Mitt - 吐司元件給子路由使用
const emitter2 = emitter;
provide("emitter", emitter2); 
</script>