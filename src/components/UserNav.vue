<template>
  
  <nav class="nav-containier navbar navbar-expand-lg">
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navBar ">

      <li>
        <router-link :to="{ name: 'home' }" class="item ">
          <li class="company-icon"><img src="../assets/images/ICON/icon-3.png" alt="" style="margin-bottom: 10px;"></li>
        </router-link>
      </li>
      
      <li>
        <router-link to="/user/about" class="item">
          <li>About</li>
        </router-link>
      </li>

      <li>
        <router-link to="/user/Allproducts" class="item">
          <li class="text-left">Products</li>
        </router-link>
      </li>

      <li>
      <router-link to="/user/userNews" class="item">
        <li >News</li>
      </router-link>
      </li>

      <li>
      <router-link to="/user/userOrder" class="item">
        <li >My Order</li>
      </router-link>
      </li>

      <!-- <router-link to="/user/cart" class="item">
        <li>購物車</li>
      </router-link> -->


      <li class="search-li">
        <input type="text" v-model="searchTxt" 
        @keydown.enter="searchArr" placeholder=" SEARCH"
        class="input">
        <router-link to="/user/Allproducts" class="item">
          <button><i class="bi bi-search" @click="searchArr"></i></button>
        </router-link>
      </li>

      <li>
      <router-link :to="{ name: 'login' }" class="item">
        <li><i class="bi bi-person-fill-gear"></i></li>
      </router-link>
      </li>

      <li>
        <router-link to="/user/favorite" class="item">
          <li><i class="bi bi-heart-fill card-button"></i></li>
        </router-link>
        <span class="qty-favorite">{{ myFavorite.length }}</span>
      </li>

      <li>
        <router-link to="/user/cart2" class="item ">
          <li><i class="bi bi-cart"></i></li>
        </router-link>
        <span class="qty-cart">{{ idArr.length }}</span>
      </li>
      
    </ul>

    
  </div>
    <!---- 漢堡線 ---->
    <!-- <a href="#" class="showBurger"><i class="bi bi-list "></i></a> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </nav>




  
  <!-- <nav class="nav-container navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link :to="{ name: 'home' }" class="item navbar-brand">
        <li>HOME</li>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>


    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ">

          <router-link :to="{ name: 'home' }" class="item navbar-brand">
            <li>HOME</li>
          </router-link>

          <router-link to="/user/about" class="item">
            <li>About</li>
          </router-link>

          <router-link to="/user/Allproducts" class="item">
            <li>Products</li>
          </router-link>

          <router-link to="/user/userNews" class="item">
            <li>News</li>
          </router-link>

          <router-link to="/user/userOrder" class="item">
            <li>My Order</li>
          </router-link>

          <li class="search-li">
            <input type="text" v-model="searchTxt" 
            @keydown.enter="searchArr" placeholder=" SEARCH"
            class="input">
            <router-link to="/user/Allproducts" class="item">
              <button><i class="bi bi-search" @click="searchArr"></i></button>
            </router-link>
          </li>

          <router-link :to="{ name: 'login' }" class="item">
            <li><i class="bi bi-person-fill-gear"></i></li>
          </router-link>

          <router-link to="/user/favorite" class="item">
            <li><i class="bi bi-heart-fill card-button"></i></li>
          </router-link>
          <span class="qty-favorite">{{ myFavorite.length }}</span>

          <router-link to="/user/cart2" class="item ">
            <li><i class="bi bi-cart"></i></li>
          </router-link>
          <span class="qty-cart">{{ idArr.length }}</span>


      </ul>
    </div>
  </div>
</nav> -->
</template>

<script setup>
import {ref, onMounted, watch, computed} from "Vue";
import axios from "axios";


// Pinia Options語法
// import useCartStore from "../stores/cartStore.js"
// import { storeToRefs } from "pinia";
// const cartStore = useCartStore();
// let {cartLength} = storeToRefs(cartStore);
// onMounted(() => {
//   cartStore.GET_CART;
// })
// const cartLength2 = computed(() => {
//   return cartLength.value ? cartLength.value.length : 0;
// })
// console.log(cartStore); 

// const del = computed(() => {
//   return cartStore.removeCartItem();
// })


// Pinia 購物車數字ICON
import useCartStore from "../stores/cartStore.js";
import { storeToRefs } from "Pinia"; // storeToRefs只適用state數據&getters, actions不行
const cartStore = useCartStore();
const {cart, idArr} = storeToRefs(cartStore); // State數據, 解構賦值之方式
const {getCart} = cartStore; // Actions方法, 解構賦值之方式
// onMounted(() => { // 要記得掛載API, 才會取得購物車資料
//   getCart();
// })
console.log(idArr.value.length)

// Pinia 我的最愛數字ICON
import useProductStore from "../stores/productsStore.js";
const productsStore = useProductStore();
const {myFavorite} = storeToRefs(productsStore);

// Pinia 搜尋BAR
import UseSearchStore from "../stores/searchStore.js";
const searchStore = UseSearchStore();
const {searchArr, getProductsBySearch, filterCategory} = searchStore;
const {searchedArr, searchTxt, filteredArr} = storeToRefs(searchStore); 

// 漢堡線
const clickBurger = () => {
  
}

</script>
<style lang="scss" scoped>
@import "../sass/_User-Nav.scss";
</style>