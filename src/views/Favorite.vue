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
    <img src="../assets/images/Favorite/Sorry.jpg" alt="">
    <router-link to="/user/Allproducts" class="item">
      <button type="button" class="favorite-btn">SHOP</button>
    </router-link>
  </div>
  <!---- Sorry海報 ---->

  <!--- 我的最愛卡片 --->
  <div class="container-fluid">
    
    <ul class="row favorite-container">
      <li v-for="(item, index) in myFavorite" :key="index" class="card me-auto">
        <div class="card-img">
          <img :src="item.product.imageUrl" alt="">
        </div>
        <div class="card-title">{{item.product.title}}</div>
        <div class="card-subtitle">{{item.product.description}}</div>
        <hr class="card-divider">
        
        <div class="card-footer">
          <div class="card-price"><span>$</span>{{item.product.price}}</div>
            <i class="bi bi-info-circle card-btn" @click="seeMore(item.product.id)"></i>
            <i class="bi bi-cart card-btn" @click="addCart(item.product.id, 1)"></i>
        </div>
  
  
      </li>
    </ul>
  </div>
  

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

// 並沒有, 可以拿掉, 2023/8/12
// 沒onMounted, 右上數字不會變動 
onMounted(() =>{
  getCart();
});

// 先不要用watch, 不然會getCart()會不斷對API送出請求 2023/8/12
// watch ( // 監聽, 取得加入購物車後的右上ICON數字; 
//   () => idArr.value,
//   (newVal) => {
//     getCart();
//   }
// )

// 查看更多
import router from "../router/index.js"
const seeMore = (id) => {
  router.push(`/user/product/${id}`)
}


// 頁尾
import Footer from "../components/Footer.vue"
</script>

<style lang="scss" scoped>
@import "../sass/_Favorite.scss";
</style>