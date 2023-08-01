<template>
  <Loading :active="isLoading"></Loading>

      <!-- HEADER START -->
      <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-3 text-white mb-4 animated slideInDown">CHECK OUT</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">HOME</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/Cart2" class="item">CHECK OUT</router-link></li>
        </ol>
      </nav>
    </div>
  </div>
  <!-- HEADER END -->

  <div class="step-container">
    <CheckoutStep></CheckoutStep>
  </div>

  <div class="container">
    
    <div class="row final-wrapper">
      <form class="col-lg-8 col-sm-12 col-xs-12" @submit.prevent="pay">
        <table class="table align-middle">
          <thead>
          <th width="120">PIC</th>  
          <th width="120">NAME</th>
          <th width="120">QTY</th>
          <th width="120">$</th>
          </thead>
          <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td><img :src="item.product.imageUrl" alt="" width="120"></td>
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}</td>
            <td >{{ filterStore.currency(item.total - item.final_total) }}</td>
          </tr>
          </tbody>
          <tfoot>
          <!-- <tr>
            <th colspan="3" class="text-end">Total</th>
            <td class="text-start">{{ total}}</td>
          </tr> -->
          </tfoot>
        </table>

        <table class="table">
          <tbody>
          <tr>
            <th width="120">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>Phone</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>Payment</th>
            <td>
              <span v-if="!order.is_paid">NO</span>
              <span v-else class="text-success">YES</span>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-end" v-if="order.is_paid === false">
          <button class="button">PAY NOW</button>
        </div>
      </form>
    </div>
</div>  

  <Footer></Footer>
</template>

<script setup>
import axios from "axios";
import {ref, onMounted} from "vue"
const isLoading = ref(false);


// vue4.x, 使用route之方法 - 以便取得網址上的orderId
import {useRoute} from "vue-router";  
const orderId = ref(null);
const route = useRoute();
onMounted(() =>{
  orderId.value = route.params.orderId;  // 拿網址上的orderId
  console.log(orderId.value);
  getOrder();
});

// 取得單筆訂單
// {{ order.user.email }} 沒有用 v-for 或是迴圈等方式就要預先定義 user: {}，
// 告訴瀏覽器 user 這是一個物件，我想要用物件取值的方式渲染出來，不然他無法解析哩
// 而v-for="item in order.products", 則是瀏覽器透過v-for了解 order.products是個陣列/物件, 所以不用在order變數裡面預設product屬性
const order = ref({user:{}});
const total = ref(null);
const getOrder = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/order/${orderId.value}`
  axios.get(url)
    .then((response) =>{
      console.log(response);
      if(response.data.success) {
        order.value = response.data.order;
        total.value = Math.floor(response.data.order.total);
        console.log(total.value);

      };
    });
};

// 結帳付款
const pay = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/pay/${orderId.value}`;
  axios.post(url)
    .then((response) => {
      console.log(response);
      if(response.data.success){
        getOrder(); // 訂單若成功付款, 再次渲染訂單畫面
      }
    })
}

import CheckoutStep from "../components/CheckoutStep.vue";
import Footer from "../components/Footer.vue";
// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>

<style scoped>
/*** HEADER ***/
.page-header {
  background: url(../assets/images/Checkout/Checkout-Headr2.jpg) center center no-repeat;
  background-size: cover;
  margin-top: 66px;
}

.page-header .breadcrumb-item+.breadcrumb-item::before {
  color: white;
}

.page-header .breadcrumb-item,
.page-header .breadcrumb-item a {
    font-size: 18px;
    color: white;
}

.step-container {
  margin: auto;
  max-width: 1200px;
  padding: 30px 0;
}
.step-guide {
  display: flex;
  justify-content: space-evenly;
  font-size: 1.6rem;
  padding: 0;
}

.step-confirm-color {
  color:rgb(218, 218, 102);
}
/** 按鈕樣式*/ 
.button {
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 18px;
  color: rgb(193, 163, 98);
  border: 2px solid rgb(193, 163, 98);
  border-radius: 34px;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgb(193, 163, 98);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
}

.button:hover::before {
  scale: 3;
}

.button:hover {
  color: #212121;
  scale: 1;
  box-shadow: 0 0px 20px rgba(193, 163, 98,0.4);
}

.button:active {
  scale: 1;
}

/* @media (max-width:768px) {
  .step-container {
    .step-guide {
      font-size: 1rem;
    }
  }
  
} */

.final-wrapper {
  display: flex;
  justify-content: center;
}

@media (max-width:576px) {
  .final-wrapper {
  }
  .final-wrapper .table {
    margin: auto;
  }
  /**「單價」與「收件人Detail」 */
  thead > tr > th:nth-last-child(1), tbody > tr > td:nth-last-child(1) {
    display: table-cell;
  }

  .button {
    margin: 10px 0;
  }

}

</style>