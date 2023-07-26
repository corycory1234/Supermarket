import {defineStore} from "pinia";
import {ref} from "vue";

// OPTION寫法
// export default defineStore ("useFilterStore", {
//   actions:{
//     // 數字千分位
//     currency(num){
//       const n = parseInt(num, 10);
//       return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`
//     },
//     // 轉當地日期
//     date(time){
//       const localDate = new Date(time * 1000);
//       return localDate.toLocaleDateString();
//     }
//   }
// })

// SETUP寫法 (但沒寫default會報錯诶?)
export default defineStore("useFilterStore", () => {
  const currency = (num) => {
    const n = parseInt(num, 10);
    return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
  };

  const date = (time) => {
    const localDate = new Date(time * 1000);
    return localDate.toLocaleDateString();
  };

  return{
    currency,
    date
  }
})