import{K as V,L as k,r as T,a as S,f as _,g,i as a,H as x,E as u,v as F,D as K,F as U,y as q,M as B}from"./index-4594cac7.js";import{r as H,a as W,b as j,c as P}from"./component-functions-91238543.js";function Y(e){return{all:e=e||new Map,on:function(o,n){var t=e.get(o);t?t.push(n):e.set(o,[n])},off:function(o,n){var t=e.get(o);t&&(n?t.splice(t.indexOf(n)>>>0,1):e.set(o,[]))},emit:function(o,n){var t=e.get(o);t&&t.slice().map(function(c){c(n)}),(t=e.get("*"))&&t.slice().map(function(c){c(o,n)})}}}const ht=Y();var N={exports:{}};/*!
  * Bootstrap toast.js v5.3.0 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(e,o){(function(n,t){e.exports=t(H(),W(),j(),P())})(V,function(n,t,c,l){const h="toast",r=".bs.toast",E=`mouseover${r}`,v=`mouseout${r}`,w=`focusin${r}`,L=`focusout${r}`,M=`hide${r}`,I=`hidden${r}`,A=`show${r}`,C=`shown${r}`,D="fade",b="hide",d="show",f="showing",O={animation:"boolean",autohide:"boolean",delay:"number"},$={animation:!0,autohide:!0,delay:5e3};class m extends n{constructor(s,i){super(s,i),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return $}static get DefaultType(){return O}static get NAME(){return h}show(){if(t.trigger(this._element,A).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(D);const i=()=>{this._element.classList.remove(f),t.trigger(this._element,C),this._maybeScheduleHide()};this._element.classList.remove(b),l.reflow(this._element),this._element.classList.add(d,f),this._queueCallback(i,this._element,this._config.animation)}hide(){if(!this.isShown()||t.trigger(this._element,M).defaultPrevented)return;const i=()=>{this._element.classList.add(b),this._element.classList.remove(f,d),t.trigger(this._element,I)};this._element.classList.add(f),this._queueCallback(i,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(d),super.dispose()}isShown(){return this._element.classList.contains(d)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(s,i){switch(s.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=i;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=i;break}}if(i){this._clearTimeout();return}const y=s.relatedTarget;this._element===y||this._element.contains(y)||this._maybeScheduleHide()}_setListeners(){t.on(this._element,E,s=>this._onInteraction(s,!0)),t.on(this._element,v,s=>this._onInteraction(s,!1)),t.on(this._element,w,s=>this._onInteraction(s,!0)),t.on(this._element,L,s=>this._onInteraction(s,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(s){return this.each(function(){const i=m.getOrCreateInstance(this,s);if(typeof s=="string"){if(typeof i[s]>"u")throw new TypeError(`No method named "${s}"`);i[s](this)}})}}return c.enableDismissTrigger(m),l.defineJQueryPlugin(m),m})})(N);var G=N.exports;const Q=k(G),z={class:"toast-header"},J={class:"me-auto"},R=a("br",null,null,-1),X={class:"me-auto"},Z=a("br",null,null,-1),tt={class:"me-auto"},et=a("br",null,null,-1),st={class:"me-auto"},ot=a("br",null,null,-1),nt={class:"me-auto"},it=a("button",{type:"button",class:"btn-close","data-bs-dismiss":"toast","aria-label":"Close"},null,-1),at={key:0,class:"toast-body"},rt={__name:"Toast",props:["msg"],setup(e){const o=T();return S(()=>{new Q(o.value,{delay:5e3}).show()}),(n,t)=>(_(),g("div",{class:"toast",role:"alert","aria-live":"assertive","aria-atomic":"true",ref_key:"toast",ref:o},[a("div",z,[a("span",{class:x([`bg-${e.msg.style}`,"p-2 rounded me-2 d-inline-block"])},null,2),a("strong",J,u(e.msg.title),1),R,a("strong",X,u(e.msg.category),1),Z,a("strong",tt,u(e.msg.unit),1),et,a("strong",st,u(e.msg.origin_price),1),ot,a("strong",nt,u(e.msg.price),1),it]),e.msg.content?(_(),g("div",at,u(e.msg.content),1)):F("",!0)],512))}},ct={class:"toast-container position-absolute pe-3 top-0 end-0"},mt={__name:"ToastMessages",setup(e){const o=T([]),n=K("emitter");return S(()=>{n.on("push-message",t=>{const{style:c="success",title:l,content:h,category:p,unit:r,price:E}=t;o.value.push({style:c,title:l,content:h,category:p,unit:r,price:E})})}),(t,c)=>(_(),g("div",ct,[(_(!0),g(U,null,q(o.value,(l,h)=>(_(),B(rt,{key:h,msg:l},null,8,["msg"]))),128))]))}};export{mt as _,ht as e};