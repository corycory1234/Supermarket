import{N as i,r as l,B as v}from"./index-81df7092.js";const p=i("useSearchStore",()=>{const a=l([]),s=l(),e=l([]),c=()=>{const r="https://vue3-course-api.hexschool.io/api/cookiemidwang-api/products/all";v.get(r).then(t=>{a.value=t.data.products.map(n=>({...n,qty:1})),console.log(a.value)})},u=()=>{if(s.value.replace(/^\s+|\s+$/gm,""))return e.value=[],o.value=[],a.value.filter(r=>{if(r.title.match(s.value))return e.value.push(r),console.log(e.value)})},o=l([]);return{getProductsBySearch:c,searchArr:u,searchedArr:e,searchTxt:s,filterCategory:r=>{e.value=[],o.value=[],console.log(e.value),o.value=a.value.filter(t=>(console.log(t.category,123),t.category===r.category))},filteredArr:o}});export{p as U};
