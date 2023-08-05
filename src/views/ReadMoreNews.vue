<template>
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


  <div class="read-more-container">
    <div class="read-more-card">
      <img :src="news.image" alt="" />
      <div class="date">{{ filterStore.date(news.create_at) }}</div>
      <!-- <i class="ion-film-marker"></i> -->
      <div class="card-content">
        <h3>{{news.title}}</h3>
        <p>{{ news.description }}</p>
        <p>{{ news.content }}</p>
        <button>
          <router-link to="/user/userNews" class="item">
          </router-link>BACK
        </button>
      </div><a href="#"></a>
    </div>

        <!--- 底部廣告 --->
        <div class="ad-bottom">
          <div class="mb-3">
            <div class="section-title1 mb-0 rounded">
                <h4 class="m-0 font-weight-bold">ADVERTISEMENT</h4>
            </div>
            <div class="bg-white text-center border border-top-0 p-3 rounded">
                <router-link to="/user/Allproducts" class="item">
                  <img class="img-fluid rounded" src="../assets/images/NEWS/AD.png" alt="">
                </router-link>
            </div>
          </div>
        </div>

  </div>

  <Footer></Footer>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
// Vue Router 4.x, 使用route方法 (透過ID, 點擊取得單一新聞)
import { useRoute } from "vue-router";
const route = useRoute();

// 生命週期 >> 渲染「單一新聞」
const id = ref(null);
onMounted(() => {
  id.value = route.params.newsId;
  getNews();
})

// 取得單一新聞
const news = ref({});
const getNews = () => {
  const url = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/article/${id.value}`;
  axios.get(url)
    .then((response) => {
      news.value = response.data.article;
      console.log(news.value);
    });
};

// 千分位&當地日期 (這邊採用Pinia, 非Mitt)
import useFilterStore from "../stores/filter.js" 
const filterStore = useFilterStore();
// Footer頁尾
import Footer from "../components/Footer.vue";
</script>

<style lang="scss" scoped>
@import "../sass/_ReadMoreNews.scss";
</style>