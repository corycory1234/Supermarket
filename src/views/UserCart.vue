<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
            <td>
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>

                <button type="button" class="btn btn-outline-danger"
                  @click="addCart(item.id)"
                  :disabled="status.loadingItem === item.id"
                  v-if="status.loadingItem !== item.id">
                  加到購物車
                </button>
                <!-- 見BootStrap-Spinner; 當status.loadingItem的id 等於 item.id, 讀取按鈕就跑出, 反之,則消失  -->
                <button class="btn btn-success" type="button" disabled 
                v-if="status.loadingItem === item.id">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  商品加入購物車中...
                </button>

              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 購物車列表 -->

      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>

                <th>品名</th>
                <th style="width: 110px" class="text-center">數量</th>
                <th  class="text-center">單價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
  
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用{{item.coupon.code}}優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <!-- updateCart函式, 將2個id與總價, 傳給後端 -->
                    <input type="number" class="form-control"
                          v-model.number="item.qty"
                          min="1"
                          @change="updateCart(item)"
                          :disabled="item.id === status.loadingItem">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-center">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ filterStore.currency(item.final_total) }}
                </td>

                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x-square-fill"></i>
                  </button>
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ filterStore.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ filterStore.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- VeeValidate表單驗證-->
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" v-slot="{ errors }"
            @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field id="email" name="email" type="email" class="form-control"
                   :class="{ 'is-invalid': errors['email'] }"
                   placeholder="請輸入 Email" rules="email|required"
                   v-model="form.user.email"></Field>
          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <Field id="name" name="姓名" type="text" class="form-control"
                   :class="{ 'is-invalid': errors['姓名'] }"
                   placeholder="請輸入姓名" rules="required"
                   v-model="form.user.name"></Field>
          <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <Field id="tel" name="電話" type="tel" class="form-control"
                   :class="{ 'is-invalid': errors['電話'] }"
                   placeholder="請輸入電話" rules="required"
                   v-model="form.user.tel"></Field>
          <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field id="address" name="地址" type="text" class="form-control"
                   :class="{ 'is-invalid': errors['地址'] }"
                   placeholder="請輸入地址" rules="required"
                   v-model="form.user.address"></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea name="" id="message" class="form-control" cols="30" rows="10"
                    v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>


  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const products = ref([]);
const product = ref({});


// 取得使用者商品
const allProductApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/products/all`
const getProducts = () => {
  isLoading.value = true;
  axios.get(allProductApi)
    .then((response) => {
      console.log(response);
      products.value = response.data.products;
      isLoading.value = false;
    })
}
onMounted(() => {
  getProducts();
  getCart();
})

// 查看更多
import router from "../router/index.js"
const getProduct = (id) => {
  router.push(`/user/product/${id}`)
}

// Overloading變數 (源自main.js)
const isLoading = ref(false);

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

// 購物車列表
const cart = ref([]);
const getCart = () => {
  const getCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
  isLoading.value = true;
  axios.get(getCartApi)
    .then((response) => {
      console.log(response);
      cart.value = response.data.data;
      isLoading.value = false;
      console.log(cart.value);
    })
}

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();

// 刪除購物車列表 (單項商品)
const removeCartItem = (id) => {
  const delCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`;
  axios.delete(delCartApi)
    .then((response) => {
      console.log(response);
      getCart();
    });
};

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
const addCouponCode = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/coupon`;
  const coupon = ref({code: coupon_code.value}); // 問：若放在全域, 會抓不到coupon_code, API會找不到優惠券
  axios.post(url, {data: coupon.value})
    .then((response) => {
      console.log(response);
      getCart();
    });
};

// 送出訂單按鈕
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
      console.log(response);
      if(response.data.success){
        const orderId = ref("");
        orderId.value = response.data.orderId;
        router.push(`/user/checkout/${orderId.value}`) // 點擊後, 頁面轉「單一訂單頁面」
      }
    });
}

</script>
