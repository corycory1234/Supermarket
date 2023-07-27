<template>
  <Loading :active="isLoading"></Loading>
     <!--- HEADER START --->
     <div class="container-fluid page-header py-5 mb-2 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-4   text-white mb-4 animated slideInDown">PRODUCTS</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">
              HOME</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/AllProducts" class="item">PRODUCTS
            </router-link></li>
        </ol>
      </nav>
    </div>
  </div>
  <!--- HEADER END --->


  <div class="row">
    <div class="col-12 col-sm-12 col-md-3">
      
      <!------ 種類列表 ------>
      <ul class="list-group">

        <!---- PINIA 搜尋INPUT ---->
        <!-- <li class="text-center">
          <input type="text" v-model="searchTxt" @keydown.enter="searchArr" placeholder=" SEARCH">
          <i class="bi bi-search" @click="searchArr"> </i>
        </li> -->
        
        <!-- class="list-group-item li-active" -->
        <!-- <template  v-for="(item, index) in getCategories" :key="index" :id="index"> -->
          <li 
          @click="clickLi(item), filterCategory(item)"
          :class="{'list-group-item': true, 'li-active': item.active ? true : false }"
          v-for="(item, index) in getCategories" :key="index" :id="index">
            {{item.category}}
            <span class="badge bg-primary rounded-pill">{{item.number}}</span>
          </li>
        <!-- </template> -->
      
      </ul>
    </div>

    <!------ 所有商品 ------>
    <div class="col-12 col-sm-12 col-md-9" v-if="filteredArr.length === 0 && searchedArr.length === 0">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-container" v-for="(product, index) in allProducts" :key="index">
          <div class="card">
            <div class="img-container">
              <img class="card-img" :src="product.imageUrl" alt="">
            </div>

            <div class="card-info">
              <p class="text-title">{{ product.title }} </p>
              <p class="text-body">{{ product.description }}</p>
            </div>
            <div class="card-footer">
              <span class="text-title">${{ product.price }}</span>
              <input type="number" v-model="product.qty" style="width: 50px">
            </div>

            <div class="card-footer">
              <i class="bi bi-info-circle card-btn" @click="seeMore(product.id)"></i>
              <i class="bi bi-heart-fill card-btn" @click="addFavorite(product.id)"></i>
              <div class="card-btn" @click="addCart(product.id, product.qty)">
                <svg class="svg-icon" viewBox="0 0 20 20" >
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


<!---- filter種類跳出的卡片商品 ---->
  <div class="col-12 col-sm-12 col-md-9" v-else-if="filteredArr.length >0 ">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-container" v-for="(product, index) in filteredArr" :key="index">
          <div class="card">
            <div class="img-container">
              <img class="card-img" :src="product.imageUrl" alt="">
            </div>

            <div class="card-info">
              <p class="text-title">{{ product.title }} </p>
              <p class="text-body">{{ product.description }}</p>
            </div>
            <div class="card-footer">
              <span class="text-title">${{ product.price }}</span>
              <input type="number" v-model="product.qty" style="width: 50px">
            </div>

            <div class="card-footer">
              <i class="bi bi-info-circle card-btn" @click="seeMore(product.id)"></i>
              <i class="bi bi-heart-fill card-btn" @click="addFavorite(product.id)"></i>
              <div class="card-btn" @click="addCart(product.id, product.qty)">
                <svg class="svg-icon" viewBox="0 0 20 20" >
                  <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                  <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                  <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


<!------ PINIA 搜尋商品 ------>
  <div class="col-12 col-sm-12 col-md-9" v-else-if="searchedArr.length>0">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-container" v-for="(product, index) in searchedArr" :key="index">
        <div class="card">
          <div class="img-container">
            <img class="card-img" :src="product.imageUrl" alt="">
          </div>

          <div class="card-info">
            <p class="text-title">{{ product.title }} </p>
            <p class="text-body">{{ product.description }}</p>
          </div>
          <div class="card-footer">
            <span class="text-title">${{ product.price }}</span>
            <input type="number" v-model="product.qty" style="width: 50px">
          </div>

          <div class="card-footer">
            <i class="bi bi-info-circle card-btn" @click="seeMore(product.id)"></i>
            <i class="bi bi-heart-fill card-btn" @click="addFavorite(product.id)"></i>
            <div class="card-btn" @click="addCart(product.id, product.qty)">
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
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


  </div>

<!-- <p v-if="refSearch">{{ refSearch.searchedArr }}</p> -->
<!-- <Search 
ref="refSearch"
:tempProduct="allProducts"
>
</Search> -->





<!-- <input type="text" v-model="searchTxt">
<button type="button" @click="searchArr">搜尋</button>   -->
<Footer></Footer>
</template>

<script setup>
import { ref, onMounted, computed, inject, watch } from "Vue";
import axios from "axios";
const result = ref([]);

// 取得所有商品
// const allProducts = ref([]);
// const getProducts = () => {
//   const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/products/all`
//   axios.get(api)
//     .then((response) => {
//       toShow.value = true
//       allProducts.value = response.data.products.map(product => ({
//         ...product, // 解構, 為了自建立qty屬性, 給input使用, 最後加入購物車, 才能回傳數量給API
//         qty: 1, // 自建立qty
//       }));
//       console.log(allProducts.value);
//     });
// };
onMounted(() => {
  getProducts();
  getProductsBySearch();
  getCart();
});


// 创建一个空对象来存储每个类别的数量
const categoryCounts = {};
// 遍历数据数组，计算每个类别的数量
const getCategories = computed(() => {
  allProducts.value.forEach(item => {
    const category = item.category;
    if (categoryCounts[category]) {
    return  categoryCounts[category] += 1;
    } else {
      return categoryCounts[category] = 1;
    }
  });

  // 将结果整理为所需的形式
 result.value = Object.entries(categoryCounts).map(([category, number]) => ({
    category,
    number,
    active: false,
  }));
  console.log(result.value);
  return result.value;
});

// 點擊<li>, 呈現<li>底色
const clickLi = (item) => {
  result.value.forEach((li) => {
    li.active = false;
    if (item.category == li.category){
      li.active = true;
    };
  });
};


//  點選<li>,進行商品category判斷
// const filteredArr = ref([]);
// 我的錯誤語法 ↓
// const filterCategory = (item) => {
//   return allProducts.value.filter((product) => {
//     console.log(product.category === item.category)
//     if (product.category === item.category){
//       filteredArr.value = product;
//       return filteredArr.value
//     };
//   });
// };

//  正確的filter語法
// filter針對陣列物件, 即便往內篩選, 回傳給filteredArr, 是一整包物件, 而不是只有回傳item.category!!!
// const filterCategory = (item) => {
//   searchedArr.value = [];
//   console.log(searchedArr.value);
//   filteredArr.value = allProducts.value.filter((product) => {
//     console.log(product.category, 123);
//     return product.category === item.category;
//   });
// };


// 加入購物車
// const status = ref({ loadingItem: null});
// function addCart(id, qty) {
//   const addCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
//   const cart = ref({product_id: id, qty: qty}); // API需要的參數【id & qty】
//   status.value.loadingItem = id; // 點擊【加入購物車】,按鍵disabled
//   axios.post(addCartApi, {data: cart.value})  // API需要id跟qty參數, 商品才能被加入
//     .then((response)=>{
//       status.value.loadingItem = null; // 成功【加入購物車】,恢復正常
//       console.log(response);
//     });
//     getProducts(); // 加完input數量, 刷新至數量1
//     getCart();
// };

// Pinia 「加入購物車按鈕、取得所有產品列表、加入我的最愛」
import useProductsStore from "../stores/productsStore.js";
const productsStore = useProductsStore();
const {allProducts} = storeToRefs(productsStore);
const {addCart, getProducts, addFavorite} = productsStore

// Pinia 「取得購物車列表」
import useCartStore from "../stores/cartStore.js";
import { storeToRefs } from "pinia";
const cartStore = useCartStore();
const {cart, idArr} = storeToRefs(cartStore);
const {getCart} = cartStore;

// 監聽idArr陣列長度, 若有變動, 則getCart刷新, idArr會再取得新Length
watch(
  () => idArr.value,
  (newIdArr) => {
    getCart();
  }
)

// 查看更多
import router from "../router/index.js"
const seeMore = (id) => {
  router.push(`/user/product/${id}`)
}

// 加入我的最愛 (取單一商品)
// const myFavorite = ref([]);
// const addFavorite = (id) => {
//   const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
//   axios.get(api)
//     .then((response) => {
//       myFavorite.value.unshift(response.data)
//       console.log(myFavorite.value);
//     });
// };

// Overloading變數 (源自main.js)
const isLoading = ref(false);

// 頁尾
import Footer from "../components/Footer.vue";

// 搜尋商品 透過defineProps 跟 ref
// import Search from "../components/Search.vue";
// const refSearch = ref(null);
// console.log(refSearch);
// const arr1 = Object.values(refSearch).map((item) => {return item});
// console.log(arr1);


// 搜尋BAR (最笨方法, 直接寫在元件裡面)
// const searchTxt = ref();
// const searchedArr = ref([]);
// const searchArr = () => {
//   if(!searchTxt.value.replace(/^\s+|\s+$/gm,'')) { return } // 禁 空字串&空白鍵  
//   return allProducts.value.filter((item) => {
//     if (item.title.match(searchTxt.value)) {
//       return searchedArr.value.push(item),
//       console.log(searchedArr.value)
//     }
//   })
// }

// Pinia 搜尋BAR
import UseSearchStore from "../stores/searchStore.js";
const searchStore = UseSearchStore();
const {searchArr, getProductsBySearch, filterCategory} = searchStore;
const {searchedArr, searchTxt, filteredArr} = storeToRefs(searchStore); 
</script>

<style lang="scss" scoped>
@import "../sass/_User-Products.scss";

</style>