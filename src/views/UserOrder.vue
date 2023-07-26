<template>

     <!--- HEADER START --->
     <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-3 text-white mb-4 animated slideInDown">MY ORDER</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">

          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">
              HOME</router-link>
            </li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/userOrder" class="item">MY ORDER
            </router-link>
          </li>

        </ol>
      </nav>
    </div>
  </div>
  <!--- HEADER END --->

  <table class="table mt-4 table-type">
    <thead>
      <tr>
        <th>下單時間</th>
        <th>購買商品</th>
        <th>數量</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>詳細資訊</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="(item, index) in myOrders" :key="index" class="active-row">
        <tr>
          <td>{{ filterStore.date(item.create_at) }}</td>

          <td>
            <ul class="list-unstyled">
              <li v-for="(commodity, index2) in item.products" :key="index2">
                {{ commodity.product.title }}
              </li>
            </ul>
          </td>

          <td>
            <ul class="list-unstyled">
              <li v-for="(commodity, index3) in item.products" :key="index3">
                {{ commodity.qty }}
              </li>
            </ul>
          </td>

          <td>NT$ {{ filterStore.currency(item.total) }}</td>
          <td>
            <span v-if="item.is_paid">已付款</span>
            <span v-else>未付款</span>
          </td>

          <td><button class="btn btn-primary" @click="view(item)">檢視</button></td>
        </tr>
      </template>
    </tbody>
  </table>

  <!---- 這邊props要傳給子元件必須是tempItem, 而非整包的myOrders ---->
  <UserOrderModal 
  :tempOrder="tempItem"
  ref="refOrderModal">
  </UserOrderModal>
  
  <Pagination
  :pages="pagination"
  :currentPage="currentPage"
  :pageLength="pageLength"
  @emit-pages="getOrders"
  @go-previous="getOrders"
  @go-next="getOrders">
    
  </Pagination>
  <Footer></Footer>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";

// 生命週期
onMounted(()=>{
  getOrders();
})

// 取得訂單
const myOrders = ref([]);

const getOrders = (page) => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/orders?page=${page}`
  axios.get(url)
  .then((response) => {
    console.log(response);
    myOrders.value = response.data.orders;
    pagination.value = response.data.pagination; // 整包分頁
    currentPage.value = pagination.value.current_page;  // 當前頁
    pageLength.value = pagination.value.total_pages;  // 頁面長度
  });
};

// 訂單視窗
import UserOrderModal from "../components/UserOrderModal.vue"
const refOrderModal = ref();
const tempItem = ref({}); 
const view = (item)=>{
  tempItem.value = {...item}; 
  // tempItem.value = JSON.parse(JSON.stringify(item))
  refOrderModal.value.showModal();
};

// 分頁
import Pagination from "../components/Pagination.vue"
const pagination = ref([]);
const currentPage = ref(1);
const pageLength = ref([]);

// 頁尾
import Footer from "../components/Footer.vue"

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>

<style lang="scss" scoped>
@import "../sass/_User-Order.scss";
</style>