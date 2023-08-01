<template>
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

  <!---- 購物STEP ---->
  <div class="step-container">
    <CheckoutStep ref="refStep"></CheckoutStep>
  </div>

   <!-- 購物車列表 -->
  <div class="wrapper container" v-if="!isNext">
    <div class="row">
      <div class=" col-xl-7  col-md-12  mt-5" >
          <table class="table align-middle">

            <!---- 表頭 ---->
            <thead>
              <tr>
                <th style="width: 150px">PIC</th>
                <th class="title-wrapper">Name</th>
                <th style="width: 110px" class="text-center" id="qty-wrapper">QTY</th>
                <th class="text-center price-wrapper">$</th>
                <th style="width: 50px" class="i-wrapper"></th>
              </tr>
            </thead>
            <tbody>
            
            <!---- 表格【內容】 ---->
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="img-wrapper" >
                  <!-- <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.product.imageUrl})`}">
                  </div> -->
                  <img :src="item.product.imageUrl" class="img-fluid" alt="" style="width: 100%">
                </td>

                <td >{{ item.product.title }}</td>

                <td>
                  <div class="input-group input-group-sm">
                    <!-- updateCart函式, 將2個id與總價, 傳給後端 -->
                    <input type="number" class="form-control"
                          v-model.number="item.qty"
                          min="1"
                          @change="updateCart(item)"
                          :disabled="item.id === status.loadingItem">
                    <!-- <div class="input-group-text">/ {{ item.product.unit }}</div> -->
                  </div>
                </td>

                <td class="text-center">
                  <!-- <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small> -->
                  {{ filterStore.currency(item.total) }}
                </td>

                <td >
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x-square-fill"></i>
                  </button>
                </td>
              </tr>
            </template>
            </tbody>
            <!-- <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ filterStore.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ filterStore.currency(cart.final_total) }}</td>
            </tr>
            </tfoot> -->
          </table>
          <!-- <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>

              <button class="btn btn-success" @click="next">下一步</button>
            </div>
          </div> -->





        
      </div>

      <!--- 右邊統計總價欄 --->
      <div class=" col-xl-5 col-md-12 mt-5">
        <table class="table align-middle">

          <tfoot>
              <tr>
                <th colspan="3">Detail</th>
                <td></td>
              </tr>
              <tr>
                <th colspan="3" class="text-start">Original Price</th>
                <td class="text-end"> {{ filterStore.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <th colspan="3" class="text-start text-success">Discounts</th>
                <td class="text-end text-success">{{ filterStore.currency(cart.final_total) }}</td>
              </tr>
              <tr v-if="!coupon_final_total">
                <th colspan="3">Total</th>
                <td class="text-end">{{  total }}</td>
              </tr>

              <tr v-else>
                <th colspan="3">After Discount</th>
                <td class="text-end">{{  filterStore.currency(total - final_total) }}</td>
              </tr>
          </tfoot>
          
      </table>


        <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="Type Coupon Code">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                USE COUPON
              </button>

              <button class=" button" @click="next">NEXT</button>
            </div>
          </div>
      </div>
    </div>
  </div>




      <!---- VeeValidate表單驗證 ---->
  <div class=" d-flex wrapper2" v-if="isNext">
      <div class="mt-5  col-lg-8 col-md-8  form-wrapper" >
      <Form class="col-lg-8 col-md-8 col-sm-12 " v-slot="{ errors }"
            @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control input"
                   :class="{ 'is-invalid': errors['email'] }"
                   placeholder="Email" rules="email|required"
                   v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <Field id="name" name="姓名" type="text" class="form-control input"
                   :class="{ 'is-invalid': errors['姓名'] }"
                   placeholder="Name" rules="required"
                   v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">Phone</label>
          <Field id="tel" name="電話" type="tel" class="form-control input"
                   :class="{ 'is-invalid': errors['電話'] }"
                   placeholder="Phone" rules="required"
                   v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">Address</label>
          <Field id="address" name="地址" type="text" class="form-control input"
                   :class="{ 'is-invalid': errors['地址'] }"
                   placeholder="Address" rules="required"
                   v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">Message</label>
          <textarea name="" id="message" class="form-control input" cols="30" rows="10"
                    v-model="form.message"></textarea>
        </div>

        <div class="form-btn-container">
          <button class=" text-start button" @click="back">BACK</button>
          <button class=" button">SEND</button>
        </div>
      </Form>
    </div>
    
          <!--- 右邊統計總價欄 --->
        <div class="col-lg-2 col-md-4 col-sm-12 mt-5 justify-content-center order-detail">
        <table class="table align-middle">

          <tfoot>
              <tr>
                <th colspan="3">DETAIL</th>
                <td></td>
              </tr>
              <tr>
                <th colspan="3" class="text-start">Original Price  </th>
                <td class="text-end"> {{ filterStore.currency(total) }}</td>
              </tr>
              <tr v-if="final_total !== total">
                <th colspan="3" class="text-start text-success">Discount</th>
                <td class="text-end text-success">{{ filterStore.currency(final_total) }}</td>
              </tr>
              <tr v-if="!coupon_final_total">
                <th colspan="3">Total</th>
                <td class="text-end">{{ total }}</td>
              </tr>
              <tr v-else>
                <th colspan="3">After Discount</th>
                <td class="text-end">{{  filterStore.currency(total - final_total) }}</td>
              </tr>
              
          </tfoot>
      </table>
      </div>

  </div>

<Footer></Footer>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
onMounted(() => {
  getCart();
})

// // 總價(未折扣) && 總價(折扣後)
// const total = ref(null);  
// const final_total = ref(null);

// 購物車列表
// const cart = ref([]);
// const itemID = ref([]);
// const getCart = () => {
//   const getCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
//   isLoading.value = true;
//   axios.get(getCartApi)
//     .then((response) => {
//       console.log(response);
//       cart.value = response.data.data;
//       total.value = response.data.data.total; // 總價(未折扣)
//       final_total.value = response.data.data.final_total; // 
//       isLoading.value = false;
//       itemID.value = cart.value.carts.map((item) => {return item.id}) //右上商品數量
//       console.log(itemID.value);
//     })
// }

// Pinia 購物車列表、刪除購物車列表(單項)、總價(未折扣)、總價(折扣後)
import useCartStore from "../stores/cartStore.js";
import { storeToRefs } from "pinia";
const cartStore = useCartStore();
const{cart, idArr, total, final_total} = storeToRefs(cartStore);
const {getCart, removeCartItem} = cartStore;
console.log(final_total)
// 加入購物車
const status = ref({ loadingItem: null}); 
function addCart(id) {
  const addCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
  const cart = ref({product_id: id, qty: 1}); // API需要的參數
  status.value.loadingItem = id; // 點擊【加入購物車】,按鍵disabled
  axios.post(addCartApi, {data: cart.value})  // API需要id跟qty參數, 商品才能被加入
    .then((response)=>{
      status.value.loadingItem = null; // 成功【加入購物車】,恢復正常
      console.log(response);
      getCart(); // 加入後, 購物車列表再渲染一次
    });
};

// 刪除購物車列表 (單項商品)
// const removeCartItem = (id) => {
//   const delCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`;
//   axios.delete(delCartApi)
//     .then((response) => {
//       console.log(response);
//       getCart();
//     });
// };

// 更新購物車(數量>>總價)
const updateCart = (item) => {
  const updateCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart/${item.id}`;
  isLoading.value = true;
  status.value.loadingItem = item.id;
  const cart2  = ref({
    product_id: item.product_id,
    qty: item.qty,
  });

  axios.put(updateCartApi, {data: cart2.value})
    .then((response) =>{
      console.log(response);
      isLoading.value = false;
      status.value.loadingItem = null;
      getCart();
    });
};


// 套入優惠券
const coupon_code = ref("");
const coupon_final_total = ref(null); // 此變數要給「折價前 & 折價後」做判斷  
const addCouponCode = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/coupon`;
  const coupon = ref({code: coupon_code.value}); // 問：若放在全域, 會抓不到coupon_code, API會找不到優惠券
  axios.post(url, {data: coupon.value})
    .then((response) => {
      coupon_final_total.value = response.data.data.final_total;
      console.log(coupon_final_total.value);
      getCart();
    });
};

// 下一步
const isNext = ref(false);
const next = () => {
  isNext.value = true;
  refStep.value.nextStep();
}
// 上一步
const back = () => {
  isNext.value = false;
  refStep.value.preStep();
}


// 送出訂單按鈕
import router from "../router/index.js"
const form = ref({
  user: {
    name: null,
    email: null,
    tel: null,
    address: null,
  },
  message: null,
});
const createOrder = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/order`;
  const order = ref(form.value);
  axios.post(url, {data: order.value})
    .then((response) => {
      refStep.value.nextStep(); // Step 從1 >> 2
      console.log(response);
      if(response.data.success){
        const orderId = ref("");
        orderId.value = response.data.orderId;
        router.push(`/user/checkout/${orderId.value}`) // 點擊後, 頁面轉「單一訂單頁面」

      }
    });
}

// Overloading變數 (源自main.js)
const isLoading = ref(false);
// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
// 頁尾
import Footer from "../components/Footer.vue";
// 步驟引入
import CheckoutStep from "../components/CheckoutStep.vue";
const refStep = ref(null);
</script>

<style lang="scss" scoped>
@import "../sass/_Cart.scss";
</style>