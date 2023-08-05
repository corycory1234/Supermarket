<template>
  <!--- 原先用forEach跑出的來的陣列, 執行v-for 【Version1】  --->
  <!-- <div class="snip1208 col-3" v-for="(news, index) in newsList" :key="index" >
    <img :src="news.image" alt=""/>
    <div class="date">{{ filterStore.date(news.create_at) }}
      <span class="day">28</span>
      <span class="month">Oct</span>
    </div>
    <i class="ion-film-marker"></i>
    
  <figcaption>
    <h3>{{news.title}}</h3>

    <p>{{ getContent(news.id)}}</p>
    
      <button>Read More</button>
  </figcaption>
</div> -->
    
<!-- <p v-for="(item, index2) in newsContent" :key="index2">
  <p>{{ item.content ? item.content : "undefined" }}</p>
</p> -->
  
   <!--- HEADER START --->
   <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-3 text-white mb-4 animated slideInDown">NEWS</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">

          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">
              HOME</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/userNews" class="item">NEWS
            </router-link></li>

        </ol>
      </nav>
    </div>
  </div>
  <!--- HEADER END --->


  <!---- 用Map跑v-for ---->
  <div class="news-container container">
    <div class="row">
    <!--左邊新聞卡片-->
    <div class="card-container col-lg-8 ">
      <div class="news-card border" v-for="(news, index) in newsContent" :key="index" >
    <div class="img-container">
      <img :src="news ? news.image : null" alt=""/>
    </div>
    <div class="date">{{ filterStore.date(news ? news.create_at : null) }}</div>
    <!-- <i class="ion-film-marker"></i> -->
    
    <div class="txt-container">
      <h4>{{news ? news.title : null}}</h4>
      <p>{{ news ? news.description : null}}</p>
      <div class="info-container">
        <div class="info-img-container">
          <img src="/src/assets/images/NEWS/pp100x100.jpg" alt="">
          <div>{{news ? news.author : null}}</div>
        </div>
        <!-- <div class="info-txt-container">
          <div><i class="bi bi-eye-fill"></i>334</div>
          <div><i class="bi bi-chat-dots"></i>334</div>
        </div> -->
      </div>
      <button @click="readMore(news.id)">READ MORE</button>
    </div>
  </div>

  <!---- 分頁 ---->
    <Pagination class="pagination-bottom"
    :pages="pagination" 
    :currentPage="currentPage"
    :pageLength="pageLength"
    @go-previous="getNews"
    @go-next="getNews"
    @emit-pages="getNews">
    </Pagination>
  </div>

  <!---- 右邊廣告區 ---->
  <div class="ad-container col-lg-4 col-md-12">
     <div class="ad-top">
        <div class="section-title1 mb-0">
          <h4>FOLLOW US</h4>
        </div>
        <div class="border border-top-0 p-3">
          <a href="" class="ad-link" style="background: #39569E;">
            <i class="bi bi-facebook m-2"></i>
            <span>999 Fans</span>
          </a>
          <a href="" class="ad-link" style="background: #52AAF4;">
            <i class="bi bi-twitter m-2"></i>
            <span>999 Followers</span>
          </a>
          <a href="" class="ad-link" style="background: #0185AE;">
            <i class="bi bi-line m-2"></i>
            <span>999 Connects</span>
          </a>
          <a href="" class="ad-link" style="background: #C8359D;">
            <i class="bi bi-instagram m-2"></i>
            <span>999 Followers</span>
          </a>
          <a href="" class="ad-link" style="background: #DC472E;">
            <i class="bi bi-google m-2"></i>
            <span>999 Subscribers</span>
          </a>
          <a href="" class="ad-link" style="background: #055570;">
            <i class="bi bi-linkedin m-2"></i>
            <span>999 Followers</span>
          </a>
        </div>
      </div>
          
      <!--- 底部廣告 --->
      <div class="ad-bottom">
        <div class="">
          <div class="section-title1 mb-0">
            <h4 class="m-0 font-weight-bold">ADVERTISEMENT</h4>
          </div>
          <div class="border border-top-0 p-3">
            <router-link to="/user/Allproducts" class="item">
                <img class="img-fluid rounded" src="../assets/images/NEWS/AD.png" alt="">
            </router-link>
          </div>
        </div>
      </div>
  </div>

  </div>
</div>
<Footer></Footer>
</template>

<script setup>
import {ref, onMounted} from "vue";
import axios from "axios";
onMounted(() => { getNews(); });

// 取得新聞列表 【單純只拿id, 並將id傳值給displayNews(id)】
const newsList = ref([]);
const newsId = ref("");
const getNews = (page) => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/articles?page=${page}`;
  axios.get(url)
    .then((response)=>{
      console.log(response);
      newsList.value = response.data.articles;
      newsId.value = newsList.value.map((item) => {return item.id}) // map傳出陣列
      displayNews(newsId); //把id當參數傳入, 為取得【新聞內容】
      pagination.value = response.data.pagination; //整包分頁
      currentPage.value = pagination.value.current_page; // 當前頁
      pageLength.value = pagination.value.total_pages; // 頁面長度
    });
};

// 取得新聞【內容】 STEP1
const newsContent = ref([]);
const displayNews = (newsId) => {
  newsId.value.map((id) => {
    const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/article/${id}`;
    axios.get(url)
    .then((response) => {
      console.log(response);
      const article = response.data.article; // response出來為OBJ物件, 先用article變數去接
        newsContent.value[id] = article;
        console.log(newsContent.value);
      newsContent.value.push(article);
      console.log(newsContent.value); // 問：不太懂空Arr, 裡面卻有4筆元素資料?? (用forEach時)
    })
  })
  console.log(newsContent.value); // 問：不太懂空Arr, 裡面卻有4筆元素資料?? (用forEach時)
  newsContent.value = []; // 記得清空, 不然點下一頁, 會跑出 10筆+1筆 = 11筆(全都在頁面上)
}

// 取得新聞【內容】 STEP2; 原先用forEach跑出的來的陣列, 執行v-for 【Version1】
const getContent = (id) => {
  const article = newsContent.value[id];
  return article ? article.content : "";
}

// ReadMore 單一新聞
import router from "../router/index.js";
const readMore = (id) => {
  router.push(`/user/userNews/${id}`)
}

// 分頁
import Pagination from "../components/Pagination.vue";
const pagination = ref([]);
const currentPage = ref(1);
const pageLength = ref([]);

//Footer 頁尾
import Footer from "../components/Footer.vue";

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>

<style lang="scss" scoped>
@import "../sass/_User-News.scss"; 
</style>