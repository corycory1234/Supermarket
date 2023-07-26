<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length"
            :class="{'text-secondary': !item.is_paid}">
          <td>{{ filterStore.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
                     v-model="item.is_paid"
                     @change="updatePaid(item)">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelOrderModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder"
    ref="refOrderModal" @update-paid="updatePaid">
  </OrderModal>
  <DelModal :item="tempOrder" ref="refDelModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
</template>

<script setup>
import OrderModal from "../components/OrderModal.vue";
import DelModal from "../components/DelModal.vue";
import Pagination from "../components/Pagination.vue";
import axios from "axios";
import {ref, inject, onMounted} from "vue";

// Overloading變數 (源自main.js)
const isLoading = ref(false);

// 生命週期
onMounted(() =>{
  getOrders();
  console.log(import.meta.env.VITE_API_SERVER);
})

// 取得所有訂單
const currentPg = ref(1);
const orders = ref({});
const pagination = ref({});
const getOrders = (currentPage = 1) => {
  currentPg.value = currentPage;
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/orders?page=:${currentPage}`;
  isLoading.value = true;
  axios.get(url)
    .then((response) => {
      orders.value = response.data.orders;
      pagination.value = response.data.pagination;
      isLoading.value = false;
      console.log(response);
    });
};

// 打開「檢視」
const tempOrder = ref({});
const refOrderModal = ref();
const openModal = (isNew, item) => {
  tempOrder.value = {...item};
  refOrderModal.showModal();
}

// Checkbox 已/未付款
const paid = ref({ is_paid: null });
const updatePaid = (item) => {
  isLoading.value = true;
  const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/order/${item.id}`;
  paid.value.is_paid = item.is_paid;
  axios.put(api, {data: paid.value})
    .then((response) => {
      isLoading.value = false;
      getOrders(currentPg.value);
      emitter.emit("push-message", {
        style: "success",
        title: "更新付款狀態!"
      });
    });
};

// 刪除
const refDelModal = ref();
const delOrder = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/order/${tempOrder.value.id}`;
  isLoading.value = true;
  axios.delete(url)
    .then((response) => {
      console.log(response);
      refDelModal.value.hideModal();
      isLoading.value = false;
      getOrders(currentPg.value);
    });
};



// Mitt跨元件傳遞 - 吐司訊息
const emitter = inject("emitter");

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>