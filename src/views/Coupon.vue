<template>
    <div class="container-fluid mt-3 position-relative">
      <ToastMessages></ToastMessages>
    </div>

  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ filterStore.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openCouponModal(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openDelCouponModal(item)"
            >刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" ref="refCouponModal"
    @update-coupon="updateCoupon">
    </CouponModal>
    <DelModal :item="tempCoupon" ref="refDelModal" 
    @del-item="delCoupon">
    </DelModal>
  </div>
</template>

<script setup>
import CouponModal from '../components/CouponModal.vue';
import DelModal from '../components/DelModal.vue';
import {ref, onMounted, provide} from "vue";

const props = defineProps({config: Object});

const tempCoupon = ref({
  title: "",
  is_enabled: 0,
  percent: 100,
  code: "",
});
// 【建立||編輯】按鈕的判斷變數
const isNewCoupon = ref(false); 
// Overloading變數 (源自main.js)
const isLoading = ref(false);


// 打開 建立||編輯 按鈕
const refCouponModal = ref(null);
const openCouponModal = (isNew, item) => {
  if(isNew === false){  // 編輯
    isNewCoupon.value = false;
    tempCoupon.value = {...item}
    console.log(tempCoupon.value); 

  }
  else{ // 建立
    isNewCoupon.value = true;
    tempCoupon.value = {};
    // new Date()取得「年月日時分秒」,getTime再把其轉乘「毫秒」, 除1000再轉成「秒」
    // 這邊的due_date除1000, 可以一打開優惠券Modal, 就會抓到「當下」年月日
    tempCoupon.value = { due_date: new Date().getTime() / 1000 }; 
    console.log(tempCoupon.value); 
  };
  refCouponModal.value.showModal();
};

// 打開 刪除 按鈕
const openDelCouponModal = (item) => {
  tempCoupon.value = {...item};
  refDelModal.value.showModal();
};

// API 取得「所有的」優惠券
import axios from 'axios';
const coupons = ref({});
const getCoupons = () => {
  isLoading.value = true;
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/coupons`;
  axios.get(url, tempCoupon.value)
    .then((response) => {
      console.log(response);
      coupons.value = response.data.coupons;
      isLoading.value = false;
    });
};
onMounted(() => {
  getCoupons();
});

// 確認「新增優惠券」
// (tempVoucher)是子元件("update-coupon",tempCoupon)傳來的參數 
const updateCoupon = (tempVoucher) => {
  if(isNewCoupon.value === true){
    const addCouponApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/coupon`;
    axios.post(addCouponApi, {data: tempVoucher})
      .then((response) => {
        console.log(response, tempVoucher);
        emitter2.emit("push-message", {
          style: "success",
          title: "新增優惠券成功!"
        });
        getCoupons();
        refCouponModal.value.hideModal();
      });
  }
  else{
    const editCouponApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`;
    axios.put(editCouponApi, {data: tempCoupon.value}) // 若watch成功監聽, temCoupon會從props得到子元件coupon資料
      .then((response) => {
        console.log(response);
        emitter2.emit("push-message", {
          style: "success",
          title: "編輯優惠券成功!"
        });
        getCoupons();
        refCouponModal.value.hideModal();
      });
  };
};

// 刪除
const refDelModal = ref(null);
const delCoupon = () => {
  const delCouponApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`;
  isLoading.value = true;
  axios.delete(delCouponApi)
    .then((response) => {
      console.log(response, tempCoupon.value);
      emitter2.emit("push-message", {
          style: "success",
          title: "刪除優惠券成功!"
        });
        refDelModal.value.hideModal();
        getCoupons();
    });
};


//  Mitt套件引入
import emitter from "../mitt/emitter.js"
import ToastMessages from "../components/ToastMessages.vue";
const emitter2 = emitter;
provide ("emitter", emitter2);

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>