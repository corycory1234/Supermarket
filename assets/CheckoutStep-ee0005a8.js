import{N as S,r as a,_ as m,I as d,f as s,g as c,F as v,y as h,H as o,x,i as r,E as y}from"./index-81df7092.js";const k=S("useStepStore",()=>({step:a(0)}));const C={class:"step-guide"},b={__name:"CheckoutStep",setup(n,{expose:i}){const l=a([{title:"Confirmation",icon:"bi bi-1-circle-fill",path:"/cart1",step:0},{title:"Receiver Info",icon:"bi bi-2-circle-fill",path:"/cart2",step:1},{title:"Payment",icon:"bi bi-3-circle-fill",path:"/cart3",step:2}]),p=()=>{e.value!==2&&e.value++},u=()=>{e.value!==0&&e.value--},_=k(),{step:e}=d(_);return i({nextStep:p,preStep:u}),(g,B)=>(s(),c("ul",C,[(s(!0),c(v,null,h(l.value,(t,f)=>(s(),c("li",{key:f,class:o([{"step-confirm-color":t.step<=x(e)},"step-style"])},[r("i",{class:o(t.icon)},null,2),r("span",null,y(t.title),1)],2))),128))]))}},E=m(b,[["__scopeId","data-v-f26cfc1f"]]);export{E as C};
