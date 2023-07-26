<template>
   <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active" aria-current="page" href="#">USER首頁</a>
          <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          <router-link to="/dashboard/news" class="nav-link">活動新聞</router-link>
          <a class="nav-link" href="#" @click.prevent="logOut">登出</a>
        </div>
      </div>
    </div>
  </nav>
  <Loading :active="isLoading"></Loading>
</template>

<script setup>
  import axios from 'axios';
  import router from "../router/index.js"
  import {ref} from "vue"

  const api = `${import.meta.env.VITE_API_SERVER}logout`
  const logOut = () => {
    isLoading.value = true;
    axios.post(api)
     .then((response) => {
      if(response.data.success){
        isLoading.value = false;
        router.push("/login") // 若成功登出, 回【登入】頁
      }
     })
  }

  const isLoading = ref(false);
</script>