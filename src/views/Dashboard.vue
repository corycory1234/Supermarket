<template>
  <NavBar></NavBar>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
  
</template>

<script setup>
import axios from "axios"
import router from "../router/index.js"
import NavBar from "../components/NavBar.vue"

//  Poliyka的axios方法 
// import api from "../boot/axios.js"
// api.post("user/check")
// .then((response)  =>  {
//     console.log(response)
//     if (!response.data.success){
//       router.push("/login"); //若驗證【持續登入】失敗, 回登入頁
//     }
//     else{
//       emitter2.emit("push-message", {
//         style: "success",
//         title: "登入成功!"
//       })
//     }
//   });

// 將存在Cookies裡的Token, 取出來;
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
console.log(token);

axios.defaults.headers.common['Authorization'] = token; // 每次發送API, 皆會夾帶Token於Headers裡
const url = `${import.meta.env.VITE_API_SERVER}api/user/check`
axios.post(url)
  .then((response)  =>  {
    console.log(response)
    if (!response.data.success){
      router.push("/login"); //若驗證【持續登入】失敗, 回登入頁
    }
    else{
      emitter2.emit("push-message", {
        style: "success",
        title: "登入成功!"
      })
    }
  });

  
//  Mitt套件引入
import {provide} from "vue";
import emitter from "../mitt/emitter.js"
import ToastMessages from "../components/ToastMessages.vue";
const emitter2 = emitter;
provide ("emitter", emitter2); 
</script>