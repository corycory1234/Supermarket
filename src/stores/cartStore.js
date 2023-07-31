import {defineStore} from "pinia";
import {ref, computed, watch} from "vue";
import axios from "axios";

export default defineStore ("useCartStore", () => {
  // 數據 (State)
  const cart = ref([]);
  const idArr = ref([]);
  const total = ref(null);
  const final_total =  ref(null);

  // 購物車列表 (Actions)
  const getCart = () => {
    const getCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`;
      axios.get(getCartApi)
        .then((response) => {
          console.log(response);
          cart.value = response.data.data;
          total.value = response.data.data.total; // 總價(未折扣)
          final_total.value = response.data.data.final_total; // 總價(折扣後)
          idArr.value = cart.value.carts.map((item) => {
            return item.id;
          })
        })
  };

  // 刪除購物車列表 (單項商品)(Actions)
  const removeCartItem = (id) => {
    const delCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`;
    axios.delete(delCartApi)
      .then((response)=>{
        getCart();
      })
  }

  // 加入購物車
  const addCart = (id) => {
    const addCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
    const cart = ref({product_id: id, qty: 1}); // API需要的參數
    axios.post(addCartApi, {data: cart.value})  // API需要id跟qty參數, 商品才能被加入
    .then((response)=>{
      getCart(); // 加入後, 購物車列表再渲染一次
    });
  }
  
  // 回傳購物車右上ICON數量
  // const cartQty = computed(()=> {
  //   if(cart.value.data && Array.isArray(cart.value.data.carts)) {
  //     return cart.value.data.carts.length;
  //   }
  //   else {
  //     return 0;
  //   }
  // })

  // 以物件方式return, 讓組件使用
  return {
    getCart, cart, idArr, removeCartItem, addCart, total, final_total,
  }
})



// export default defineStore ("cartStore", () => {

// // 購物車列表
// const cart = ref([]);
// const cartLength = ref([]);
// const getCart = () => {
//   const getCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`;
//   axios.get(getCartApi)
//     .then((response) => {
//       console.log(response);
//       cart.value = response.data.data;
//       total.value = response.data.data.total; // 總價(未折扣)
//       final_total.value = response.data.data.final_total; // 總價(折扣後)
//       cartLength.value = cart.value.carts.map((item) => {return item.id}) //右上商品數量
//     });
//   };

//   return {
//     getCart,
//     cartLength
//   }
// });

// export default defineStore("useCartStore", {
//   state: () => ({
//     cart2: [],
//     cartLength: [],
//   }),

//   getters: {
//     GET_CART() {
//       this.getCart();
//       // this.addCart();
//     }
//   },
  
//   actions: {
//     getCart() {
//       const getCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`;
//       axios.get(getCartApi)
//         .then((response) => {
//           console.log(response);
//           this.cart2 = response.data.data;
//           // total.value = response.data.data.total; // 總價(未折扣)
//           // final_total.value = response.data.data.final_total; // 總價(折扣後)
//           this.cartLength = this.cart2.carts.map((item) => {return item.id}) //右上商品數量
//         });
//     },

//     addCart(id) {
//       const addCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart`
//       const cart = ref({product_id: id, qty: 1}); // API需要的參數
    
//       axios.post(addCartApi, {data: cart.value})  // API需要id跟qty參數, 商品才能被加入
//         .then((response)=>{
          
//           console.log(response);
//           this.getCart(); // 加入後, 購物車列表再渲染一次
//         });
//     },

//     // 刪除購物車列表 (單項商品)
//     removeCartItem (id) {
//     const delCartApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/cart/${id}`;
//     axios.delete(delCartApi)
//       .then((response) => {
//         console.log(response);
//         this.getCart();
//       });
//     },

//   },

// })