<template>
     <!--- HEADER START --->
     <div class="container-fluid page-header py-5 mb-2 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-4   text-white mb-4 animated slideInDown">FAVORITE</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">

          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">
              HOME</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/favorite" class="item">FAVORITE
            </router-link></li>

        </ol>
      </nav>
    </div>
  </div>
  <!--- HEADER END --->

  <!---- Sorry海報 ---->
  <div v-if="myFavorite.length === 0" class="sorryPoster">
    <img src="../assets/images/Favorite/SorryPoster.png" alt="">
  </div>
  <!---- Sorry海報 ---->

  <ul class="card-container">
    <li v-for="(item, index) in myFavorite" :key="index" class="card">
      
      <!-- <div class="card "> -->
        <div class="card-img">
          <img :src="item.product.imageUrl" alt="">
        </div>
        <div class="card-title">{{item.product.title}}</div>
        <div class="card-subtitle">{{item.product.description}}</div>
        <hr class="card-divider">
        <div class="card-footer">
          <div class="card-price"><span>$</span>{{item.product.price}}</div>
          <button class="card-btn" @click="addCart(item.product.id, 1)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z">
              </path>
              <path
                d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
              </path>
              <path
                d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
              </path>
              <path
                d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z">
              </path>
            </svg>
          </button>
        </div>
      <!-- </div> -->

    </li>
  </ul>

  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import useProductsStore from "../stores/productsStore.js";
import { storeToRefs } from "pinia";

// Pinia 「我的最愛Arr、加入購物車」
const productsStore = useProductsStore();
const { addFavorite, addCart } = productsStore;
const { myFavorite } = storeToRefs(productsStore);
console.log(myFavorite.value);

// Pinia 「取得購物車列表、購物車ID陣列」
import useCartStore from "../stores/cartStore.js"
const cartStore = useCartStore();
const {idArr, cart} = storeToRefs(cartStore);
const {getCart} = cartStore;
// onMounted(() =>{
//   getCart();
// });
watch ( // 監聽, 取得加入購物車後的右上ICON數字
  () => idArr.value,
  (newVal) => {
    getCart();
  }
)


// 頁尾
import Footer from "../components/Footer.vue"
</script>

<style lang="scss" scoped>
@import "../sass/_Favorite.scss";
</style>