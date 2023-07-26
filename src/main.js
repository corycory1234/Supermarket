// App實例
import { createApp } from 'vue'
const app = createApp(App);

// Pinia引入
import { createPinia } from "pinia" 
const pinia = createPinia();
app.use(pinia);

// Axios引入
import VueAxios from 'vue-axios' 
import axios from 'axios'
app.use(VueAxios, axios);

// Bootstrap引入
import "bootstrap/dist/css/bootstrap.min.css" //Bootstrap引入
import "bootstrap/dist/js/bootstrap.js" //Bootstrap引入
import "bootstrap-icons/font/bootstrap-icons.css" // BS圖示引入

// Router引入
import router from "./router/index.js";

// Overlay套件引入
import Loading from 'vue3-loading-overlay'; 
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'; // Overlay套件CSS引入

// vee-validate引入
import {  Form, Field, ErrorMessage, defineRule, configure,} from "vee-validate";
import AllRules from "@vee-validate/rules"; // vee-validate引入
import { localize, setLocale } from "@vee-validate/i18n"; // i18n引入
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json"; // 繁中引入

// import './style.css'
// import "./css/all.css" // Scss引入
import "./sass/all.scss";
import App from './App.vue';


// veeValidate套用
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({zh_TW: zhTW}), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
})
setLocale("zh_TW");// 設定語系


// 安裝&全域註冊
app.use(router);
app.component("Loading", Loading); // 採用Component全域註冊, 因每個地方都用得到; 這樣一來任何元件檔 就不用再import一次
app.component("Form", Form); // VeeValidate的HTML標籤
app.component("Field", Field);// VeeValidate的HTML標籤
app.component("ErrorMessage", ErrorMessage);// VeeValidate的HTML標籤
app.mount("#app");
// createApp(App).mount('#app')
