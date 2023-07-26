<template>
  <Loading :active="isLoading"></Loading>

<!---- 登入頁面 ---->
 <!-- <div class="container mt-5">
    <form class="row justify-content-center"
      @submit.prevent="signIn">
      <div class="col-md-12">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">電址郵件</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">密碼</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div> -->


  <!---- 登入頁面2 ---->

  <section class="login" >
  
  <div class="container py-5 h-100">
    <div class="row login-container h-100">
      <div class="col col-xl-10">
        <div class="card">
          <div class="row g-0">
          
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form @submit.prevent="signIn">

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <!-- <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i> -->
                    <span class="h1 fw-bold mb-0">
                      <router-link :to="{ name: 'home' }" class="item">
                        回首頁LOGO</router-link>
                    </span>
                  </div>

                  <!-- <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5> -->

                  <div class="form-outline mb-4">
                    <input class="form-control form-control-lg"
                    type="email"
                    id="Email"
                    placeholder="Email address"
                    required
                    autofocus
                    v-model="user.username" />
                    <label class="form-label" for="Email">Email Address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input class="form-control form-control-lg"
                    type="password"
                    id="Password"
                    placeholder="Password"
                    required
                    v-model="user.password"/>
                    <label class="form-label" for="Password">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>

                  <!-- <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="#!"
                      style="color: #393f81;">Register here</a></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a> -->
                </form>
              </div>
            </div>

            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="../assets/images/LOGIN/Login.jpeg"
                alt="login form" class="img-fluid" style="border-radius: 0 1rem 1rem 0;" />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
import router from "../router/index.js"
// import $http from "axios"

// 登入頁面
const user = ref({
  username: "",
  password: ""
})
// Token & 到期日
let token = ""; //不用const & ref, 因會從空字串 >> 一堆亂數生成碼
let expired = "";

// 登入送出帳密 & 取得Token與到期日
const signIn = () => {
  const api = `${import.meta.env.VITE_API_SERVER}admin/signin`;
  isLoading.value = true;
  axios.post(api, user.value)
  .then((response) => {

    if(response.data.success) {
      isLoading.value = false;
      token = response.data.token;
      console.log(token)
      expired = response.data.expired;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      console.log(document.cookie);
      router.push("/Dashboard/Products") // 登入成功, 就跳到Dashboard.vue
    }
  })

  // 用$http也可以發出POST請求, 但記得要import $http from "axios"
  // $http.post(api, user.value)
  // .then((response) => {
  //   console.log(response);
  // })
};

// Overloading變數
const isLoading = ref(false);
</script>

<style lang="scss" scoped>
@import "../sass/_Login.scss";
</style>