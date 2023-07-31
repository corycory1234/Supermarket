import { defineStore } from "pinia";
import {ref, computed} from "vue";
import axios from "axios";
// Pinia 購物車引入
import useCartStore from "../stores/cartStore.js";


export default defineStore ("useProductsStore", () => {
  // 數據 (State)  
  const allProducts = ref([]);
  const myFavorite = ref([]);
  const cartStore = useCartStore();
  const pagination = ref([]);
  const currentPage = ref(1);
  const pageLength = ref([]);
  const {getCart} = cartStore;

  // 取得所有商品 (Actions)
  const getProducts = (page) => {
    const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/products/all`
    axios.get(api)
    .then((response) => {
      allProducts.value = response.data.products.map(product => ({
        ...product, // 解構, 為了自建立qty屬性, 給input使用, 最後加入購物車, 才能回傳數量給API
        qty: 1, // 自建立qty
      }));
      // pagination.value = response.data.pagination; // 分頁，暫時先不用
      // currentPage.value = pagination.value.current_page; // 分頁，暫時先不用
      // pageLength.value = pagination.value.total_pages; // 分頁，暫時先不用
    });
};
  // 加入購物車 (Actions)
  const addCart = (id, qty) => {
    const addCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
    const cart = ref({product_id: id, qty: qty}); // API需要的參數【id & qty】
    axios.post(addCartApi, {data: cart.value})  // API需要id跟qty參數, 商品才能被加入
      .then((response)=>{
        console.log(response);
        getCart(); // 新增商品後, 更新購物車(包含商品Arr長度)
      });
      // getProducts(); // 加完input數量, 刷新至數量1
  };

// 加入我的最愛 (取單一商品)
  const addFavorite = (id) => {
  const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/product/${id}`;
  axios.get(api)
    .then((response) => {
      console.log(response.data);
      myFavorite.value.unshift(response.data)
      console.log(myFavorite.value);
    });
};

  return {
    addCart, 
    getProducts, 
    allProducts, 
    addFavorite, 
    myFavorite, 
    // pagination, 
    // currentPage, 
    // pageLength
  }
})