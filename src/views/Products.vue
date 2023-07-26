<template>
  <!-- :active="isLoading" 其實是props -->
  <Loading :active="isLoading"></Loading>
  <div class="text-end">
    <button class="btn btn-primary" type="button"
    @click="openModal(true)">
    新增商品
  </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">圖片</th>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td><img :src="item.imageUrl" alt="" width="120"></td>
        <td>{{ item.category}}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          <!-- 千分位, 因為currency是函式, 後面要上() -->
          {{ filterStore.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ filterStore.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-danger" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click="openModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal 
  ref="refModal"
  :product="tempProduct"
  @update-product="updateProduct">
  </ProductModal>

  <DelModal
  :item="tempProduct"
  @del-item="delProduct"
  ref="refDelModal">   
  </DelModal>

  <Pagination
  :pages="pagination"
  :currentPage="currentPageProps"
  :pageLength="pageLength"
  @emit-pages="getProducts"
  @go-previous="getProducts"
  @go-next="getProducts">
  </Pagination>
</template>

<script setup>
import axios from "axios";
import {ref, onMounted, computed, inject} from "vue";
import ProductModal from "../components/ProductModal.vue";
import DelModal from "../components/DelModal.vue";

//  Poliyka的axios方法
// import api from "../boot/axios.js"
// const getProducts = (page) => {
//   const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`
//   isLoading.value = true, 
//   api.get(`${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`)
//   .then((response) => {
//     isLoading.value = false;
//     if(response.data.success){
//       console.log(response.data);
//       products.value = response.data.products;
//       pagination.value = response.data.pagination; //分頁
//       currentPageProps.value = response.data.pagination.current_page; //分頁
//       pageLength.value = response.data.pagination.total_pages; //分頁
//     }
//   })
// };


// 取得API後臺商品
const products = ref([]);
const pagination = ref({});
const currentPageProps = ref(1);
const pageLength = ref([]);
const getProducts = (page) => {
  const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/products/?page=${page}`
  isLoading.value = true, 
  axios.get(api)
  .then((response) => {
    isLoading.value = false;
    if(response.data.success){
      console.log(response.data);
      products.value = response.data.products;
      pagination.value = response.data.pagination; //分頁
      currentPageProps.value = response.data.pagination.current_page; //分頁
      pageLength.value = response.data.pagination.total_pages; //分頁
    }
  })
};
onMounted(() => {
  getProducts();
});

// 【打開】Modal
// 子元件標籤當中的ref="reftModal", 可直接抓到父元件, 當變數使用(但變數名必須一樣)
const refModal = ref(null);
const tempProduct = ref({});
const isNewItem = ref(false); // 會使用在【確認】按鈕的if判斷中
const openModal = (isNew, item) => { // isNew = false >> 編輯, 反之走新增
  if(isNew === false){
    isNewItem.value = false
    tempProduct.value = {...item};
  }
  else{
    isNewItem.value = true
    tempProduct.value = {};
  };
  refModal.value.showModal();
}

// 【確認】按鈕
const updateProduct = (newProduct) => {
  isLoading.value = true; 
  tempProduct.value = newProduct;
  // 新增
  let addApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/product`;
  if(isNewItem.value === true) {
    console.log(isNewItem.value);
    axios.post(addApi, {data: tempProduct.value}) //這邊{data: ...}, 是依據API要的格式回傳↑
      .then((response) => {

        /** Mitt跨元件傳遞 - 吐司訊息**/
        if (response.data.success) {
          refModal.value.hideModal(); // 新增完 >> 關掉Modal視窗
          isLoading.value = false;
          getProducts();
          emitter.emit("push-message", {
            style: "success",
            title: "新增成功!"
          })
        }else{
          emitter.emit("push-message", {
            style: "danger",
            title: "新增失敗!",
            content: response.data.message.join('、')
          })
        }
      });
  }
  // 編輯
  else {
    console.log(isNewItem.value);
    let editApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/product/${newProduct.id}`
    axios.put(editApi, {data: tempProduct.value})
      .then((response) => {

        if (response.data.success) {
        refModal.value.hideModal();
        isLoading.value = false;
          getProducts();
          emitter.emit("push-message", {
            style: "success",
            title: "編輯成功!"
          })
        }else{
          emitter.emit("push-message", {
            style: "danger",
            title: "編輯失敗!",
            content: response.data.message.join('、')
          })
        }
      });
  };
};

// 開啟【刪除】按鈕
const refDelModal = ref();
function openDelModal (item) {
  tempProduct.value = {...item};
  refDelModal.value.showModal();
};
// 【確認刪除】按鈕
const delProduct = () => {
  isLoading.value = true; 
  const delApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/product/${tempProduct.value.id}`
  axios.delete(delApi)
    .then((response) => {
      /** Mitt跨元件傳遞 - 吐司訊息**/
      if (response.data.success) {
        refDelModal.value.hideModal();
        isLoading.value = false;
          getProducts();
          emitter.emit("push-message", {
            style: "success",
            title: "刪除成功!"
          })
        }
    });
};

// Overloading變數 (源自main.js)
const isLoading = ref(false);

// Mitt跨元件傳遞 - 吐司訊息
const emitter = inject("emitter");

// 分頁
import Pagination from "../components/Pagination.vue"

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();

</script>