import {defineStore} from "pinia";
import {ref, computed} from "vue";
import axios from "axios";

export default defineStore ("useSearchStore", () => {
  // 數據 (State)
  const allProducts = ref([]);
  const searchTxt = ref();
  const searchedArr = ref([]);

  // 取得所有商品 (Actions)
  const getProductsBySearch = () => {
    const api = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/products/all`
    axios.get(api)
      .then((response) => {
        allProducts.value = response.data.products.map(product => ({
          ...product, // 解構, 為了自建立qty屬性, 給input使用, 最後加入購物車, 才能回傳數量給API
          qty: 1, // 自建立qty
        }));
        console.log(allProducts.value);
      });
  };

  // 搜尋商品
  const searchArr = () => {
    if (!searchTxt.value.replace(/^\s+|\s+$/gm, '')) { return } // 禁 空字串&空白鍵
    searchedArr.value = []; // 要歸零, 不然搜尋完, 在點篩選種類, 會FAIL
    filteredArr.value = []; // 要歸零, 不然搜尋完, 在點篩選種類, 會FAIL 
    return allProducts.value.filter((item) => {
      if (item.title.match(searchTxt.value)) {
        return searchedArr.value.push(item),
          console.log(searchedArr.value);
      }
    })
  };

// 正確的filter語法
// filter針對陣列物件, 即便往內篩選, 回傳給filteredArr, 是一整包物件, 而不是只有回傳item.category!!!
// 商品種類篩選
const filteredArr = ref([]);
const filterCategory = (item) => {
  searchedArr.value = []; // 要歸零, 不然篩選完, 在點搜尋, 會FAIL
  filteredArr.value = []; // 要歸零, 不然篩選完, 在點搜尋, 會FAIL
  console.log(searchedArr.value);
  filteredArr.value = allProducts.value.filter((product) => {
    console.log(product.category, 123);
    return product.category === item.category;
  });
};


  return {getProductsBySearch, searchArr, searchedArr, searchTxt, filterCategory, filteredArr}
})