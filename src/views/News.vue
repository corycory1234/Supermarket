<template>
  <!--- 建立新聞按鈕 --->
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openNewsModal(false)">
      建立新聞
    </button>
  </div>
   
  <!--- 渲染新聞 --->
  <div class="row justify-content-center change">
    <div class="snip1493 col-3" v-for="(news, index) in newsList2" :key="index">
      <div class="image"><img :src="news ? news.image : null" alt="" /></div>
      <figcaption>
        <div class="date"><span class="day">28</span><span class="month">Oct</span></div>
        <h4>{{news ? news.title : null}}</h4>
        <h5>{{ filterStore.date(news ? news.create_at : null) }}</h5>
          <!-- 按鍵、內容有BUG -->
        <!-- <textarea v-if="hideContent" disabled>{{ newsContent }}</textarea> -->
        
        <footer>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
            @click="openNewsModal(true, news)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(news)">刪除</button>

            <button class="btn btn-outline-info btn-sm" 
            @click="displayNews(news)"
            v-if="hideContent === false">新聞內容</button>

            <button class="btn btn-outline-info btn-sm" 
            @click="hideNews"
            v-if="hideContent === true">收回</button>
          </div>
        </footer>
        <p v-if="hideContent === true">{{ news ? news.content : null }}</p>
      </figcaption>
    </div>
  </div>

  <!-- 按鍵、內容有BUG -->
  <!-- <textarea v-if="hideContent" disabled>{{ newsContent }}</textarea> -->

  <NewsModal
  ref="refNewsModal"
  :news="tempNews"
  @update-news="updateNews">
  </NewsModal>

  <Pagination 
  :pages="pagination" 
  :currentPage="currentPage"
  :pageLength="pageLength"
  @go-previous="getNews"
  @go-next="getNews"
  @emit-pages="getNews">
  </Pagination>

  <DelModal
  ref="refDelModal"
  :item="tempNews"
  @del-item="delNews">
  </DelModal>
</template>

<script setup>
import axios from 'axios';
import {ref, onMounted} from "vue";
import NewsModal from '../components/NewsModal.vue';
onMounted(() => {getNews();});

// 取得新聞列表 【只單純拿ID跟Pagiantion】
const newsList = ref(null);
const newsId = ref([]);
const getNews = (page) => {
  currentPage.value = currentPage;
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/articles?page=${page}`;
  axios.get(url)
    .then((response) => {
      console.log(response);
      newsList.value = response.data.articles;
      newsId.value = newsList.value.map((news) => { // 要用map去拿Arr裡面的Obj, 變數newsId才會是Arr型別
        return news.id;
      });
      pagination.value = response.data.pagination; // 整包分頁
      currentPage.value = pagination.value.current_page; // 當前頁
      pageLength.value = pagination.value.total_pages; // 頁面長度
      getNews2(newsId); // 把ID當參數, 單筆文章API才能套入URL網址 
    });
};

// 取單筆文章 
const newsList2 = ref([]);
const getNews2 = (newsId) => {
  newsId.value.map((id) => {
    const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/article/${id}`;
    axios.get(url)  
  .then((response) => {
      newsList2.value.unshift(response.data.article); //透過map把id丟到API網址, 並用newsList陣列, 接收response
      console.log(newsList2.value);
    })
  })
}

// 【打開】新增 || 編輯 
const refNewsModal = ref(null);
const tempNews = ref({});
const isOldNews = ref(false); // 使用在【確認】按鈕的if判斷中
const openNewsModal = (isOld, item) => {
  // 編輯
  if (isOld === true){  
    isOldNews.value = true;
    tempNews.value = {...item};
    console.log("我是打開編輯"); 
  }
  // 建立
  else { 
    isOldNews.value = false;
    tempNews.value = {};
    // new Date()取得「年月日時分秒」,getTime再把其轉乘「毫秒」, 除1000再轉成「秒」
    // 這邊的due_date除1000, 可以一打開優惠券Modal, 就會抓到「當下」年月日
    tempNews.value = { create_at: new Date().getTime() / 1000 };
    console.log("我是打開新增"); 
  };
  refNewsModal.value.showModal();
};

// 【確認】更新 按鈕
const updateNews = (news) => {
  tempNews.value = news;
  const addApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/article`;
  if(isOldNews.value === false){
    axios.post(addApi, {data: tempNews.value})
      .then((response) => {
      console.log(response);
      refNewsModal.value.hideModal();
      getNews();
    });
  }
// 【確認】編輯 按鈕
  else {
    isOldNews.value = true;
    let editApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/article/${tempNews.value.id}`;
    axios.put(editApi,{data: tempNews.value})
      .then((response) => {
        console.log(response);
        refNewsModal.value.hideModal();
        getNews();
      })
  };
};


// 【打開】刪除按鈕
const openDelModal = (news) => {
  tempNews.value = {...news};
  refDelModal.value.showModal();
};

// 【刪除】文章按鈕
import DelModal from "../components/DelModal.vue";
const refDelModal = ref(null);
const delNews = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/article/${tempNews.value.id}`;
  axios.delete(url)
    .then((response) =>{
      console.log(response);
      refDelModal.value.hideModal();
      getNews();
    });
};

// 【展示】新聞內容
const newsContent = ref("");
const hideContent = ref(false);
const displayNews = (news) => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/article/${news.id}`;
  axios.get(url)
    .then((response) => {
      console.log(response);
      newsContent.value = response.data.article.content;
    });
    hideContent.value = true;
};

// 【隱藏】新聞
const hideNews = () => {
  hideContent.value = false;
};

// 分頁
import Pagination from "../components/Pagination.vue";
const pagination = ref([]);
const currentPage = ref(1);
const pageLength = ref([]);

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js";
const filterStore = useFilterStore();
</script>

<style scoped>
textarea{
  width: 300px;
  height: 150px;
}
</style>