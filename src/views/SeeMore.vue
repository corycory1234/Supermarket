<template>
 <Loading :active="isLoading"></Loading>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart2">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    
    <div class="row justify-content-between">
      <article class="col-8 card">
        <h2>{{ product.title }}</h2>
        <!-- <div>{{ product.content }}</div> -->
        <div>{{ product.description }}</div>
        <div class="img-container">
          <img :src="product.imageUrl" alt="" class="card-img" width="120">
        </div>

      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <!-- <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del> -->
        <div class="h5" v-if="product.price">NTD$ {{ product.price }} 元</div>
        <hr>
        <!---- SVG按鈕 ---->
        <button type="button" class="card-button"
        @click="addToCart(id)"
        :disabled="status.loadingItem === product.id"
        v-if="status.loadingItem !== product.id">
          <svg class="svg-icon" viewBox="0 0 20 20">
            <path
              d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z">
            </path>
            <path
              d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z">
            </path>
            <path
              d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z">
            </path>
          </svg>
        </button>

        <!-- 見BootStrap-Spinner; 當status.loadingItem的id 等於 product.id, 讀取按鈕就跑出, 反之,則消失  -->
        <button class="btn btn-success" type="button" 
        disabled v-if="status.loadingItem === product.id">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          商品加入購物車中...
        </button>
      </div>
    </div>
  </div>



  
</template>

<script setup>
import axios from "axios";
import {ref, onMounted, inject} from "Vue";
// vue4.x, 使用route之方法
import {useRoute} from "vue-router";  
const route = useRoute();

//生命週期 >> 渲染「單一商品」
const id = ref("");
onMounted(() =>{
  id.value = route.params.productId; //見ROUTER 35行
  console.log(id.value);
  getProduct();
});

// 取得單一商品
const product = ref({});
const getProduct = () => {
  const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/product/${id.value}`
  isLoading.value = true;
  axios.get(api)
    .then((response) => {
      console.log(response);
      isLoading.value = false;
      if (response.data.success) {
        product.value = response.data.product;
        id.value = product.value.id;  // 直接跟product變數拿id
      };
    });
};


// 【加入】購物車
import router from "../router/index.js"
const cart = ref({product_id: id, qty: 1});
const emitter = inject("emitter"); // 吐司訊息
const status = ref({loadingItem: null});

const addToCart = (id, qty=1) => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`;
  // isLoading.value = true;
  status.value.loadingItem = id ; // 點擊【加入購物車】,按鍵disabled
  axios.post(url, {data: cart.value})
    .then((response) => {
      // isLoading.value = false;
      // emitter.on("push-message", {
      //   style: "success",
      //   title: "成功加入購物車!"
      // });
      console.log(response);
      status.value.loadingItem = null; // 成功【加入購物車】,恢復正常
      router.push("/user/cart2");
    });
};


// Overloading變數 (源自main.js)
const isLoading = ref(false);
</script>


<style scoped>
.card {
  width: 300px;
  /* height: 254px; */
  height: 400px;
  padding: .8em;
  background: #f5f5f5;
  position: relative;
  overflow: visible;
  box-shadow: 5px 1px 3px rgba(0, 0, 0, 0.12), 5px 5px 2px rgba(0, 0, 0, 0.24);
  text-align: center;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.card-img {
  background-color: #ffcaa6;
  /* height: 40%; */
  /* width: 100%; */
  border-radius: .5rem;
  transition: .3s ease;
  width: 140px;
  height: 140px;
  object-fit: cover;
}

.card-info {
  padding-top: 10%;
}

svg {
  width: 20px;
  height: 20px;
}

.card-footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

/*Text*/
.text-title {
  font-weight: 900;
  font-size: 1.2em;
  line-height: 1.5;
  text-align: center;
}

.text-body {
  font-size: .9em;
  padding-bottom: 10px;
  text-align: center;
}

/*Button*/
.card-button {
  border: 1px solid #252525;
  display: flex;
  padding: .3em;
  cursor: pointer;
  border-radius: 50px;
  transition: .3s ease-in-out;
}

/*Hover*/
.card-img:hover {
  transform: translateY(-25%);
  box-shadow: rgba(226, 196, 63, 0.25) 0px 13px 47px -5px, rgba(180, 71, 71, 0.3) 0px 8px 16px -8px;
}

.card-button:hover {
  border: 1px solid #ffcaa6;
  background-color: #ffcaa6;
}
</style>