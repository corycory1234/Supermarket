<template>
  <!-- HEADER -->
  <div class="container-fluid page-header py-5">
    <div class="container text-center py-5 d-flex flex-column ">
      <h1 class="display-4 text-white mb-4">COUPONS</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0 mt-4">
          <li class="breadcrumb-item ">
            <router-link :to="{ name: 'home' }" class="item">
              HOME</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/UserCoupons" class="item">COUPONS
            </router-link>
          </li>
        </ol>
      </nav>
    </div>
  </div>

  <!-- 優惠券 -->
  <div class="container">
    <div class="row my-5 justify-content-center">
      <div class="row d-flex align-items-center mb-5 ">
        <img src="../assets/images/Home-AD/home-AD6.png" alt="" class="col-sm-12 col-md-12 col-lg-6">
        <div class="row col-sm-12 col-md-12 col-lg-6 ">
          
          <span class="coupon-intro"><h5> 🛒 Save Big with Our 10% Discount Coupon! 🛍️</h5>

Attention, savvy shoppers! Get ready to unlock incredible savings at ZOZO with our exclusive 10% discount coupon.</span>
  
              <div class="row d-flex justify-content-end mt-2">
                <input  class="col-3 text-center code-input" type="text" :value="code1" readonly> 
                <button class="col-4 copyBtn" type="button" @click="copy(code1, 0)">{{btnTxt[0]}}</button>
              </div>
        </div>

      </div>

      <div class="row d-flex align-items-center mb-5 reverse-container">
        <img src="../assets/images/Home-AD/home-AD7.png" alt="" class="col-sm-12 col-md-12 col-lg-6">
        <div class="row col-sm-12 col-md-12 col-lg-6">
          
          <span class="coupon-intro">
            <h5>🛍️ Shop More, Pay Less</h5>
             Receive a flat 20% off on your entire purchase. From fresh produce to pantry staples and everything in between, your savings are here to make your shopping experience even better.</span>
  
              <div class="row d-flex justify-content-end mt-2">
                <input  class="col-3 text-center code-input" type="text" :value="code2" > 
                <button class="col-4 copyBtn" type="button" @click="copy(code2, 1)">{{btnTxt[1]}}</button>
              </div>
        </div>

      </div>

      <div class="row d-flex align-items-center">
        <img src="../assets/images/Home-AD/home-AD8.png" alt="" class="col-sm-12 col-md-12 col-lg-6">
        <div class="row col-sm-12 col-md-12 col-lg-6">
          
          <span class="coupon-intro">
            <h5>📆 Limited-Time Offer, 40% OFF!</h5>
             Hurry, this amazing deal won't last forever! Make the most of this opportunity to treat yourself, your family, and your home to the very best while keeping your budget in check.</span>
              <div class="row d-flex justify-content-end mt-2">
                <input  class="col-3 text-center code-input" type="text" :value="code4" > 
                <button class="col-4 copyBtn" type="button" @click="copy(code4, 2)">{{btnTxt[2]}}</button>
              </div>
        </div>

      </div>

    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Footer from "../components/Footer.vue";
import{ref} from "vue";

// 優惠碼
const code1 = ref("111");
const code2 = ref("222");
const code4 = ref("444");

// 按鈕文字
const btnTxt = ref(["COPY", "COPY", "COPY"]);

// 剪貼簿
const copy = (code, index) => {
  navigator.clipboard.writeText(code).then(() => {
  });
  btnTxt.value[index] = "COPIED!"
};

</script>

<style lang="scss" scoped
>@import "../sass/_User-Coupons.scss";
</style>