import{N as l,r as o,B as i}from"./index-4594cac7.js";const m=l("useCartStore",()=>{const r=o([]),s=o([]),n=o(null),d=o(null),c=()=>{const a="https://vue3-course-api.hexschool.io/api/cookiemidwang-api/cart";i.get(a).then(t=>{console.log(t),r.value=t.data.data,n.value=t.data.data.total,d.value=t.data.data.final_total,s.value=r.value.carts.map(e=>e.id)})};return{getCart:c,cart:r,idArr:s,removeCartItem:a=>{const t=`https://vue3-course-api.hexschool.io/api/cookiemidwang-api/cart/${a}`;i.delete(t).then(e=>{c()})},addCart:a=>{const t="https://vue3-course-api.hexschool.io/api/cookiemidwang-api/cart",e=o({product_id:a,qty:1});i.post(t,{data:e.value}).then(h=>{c()})},total:n,final_total:d}});export{m as u};