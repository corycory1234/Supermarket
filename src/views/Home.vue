<template >
  <meta name="viewport" content="width=device-width,initial-scale=1" />
<!---- 導覽列 ---->
<UserNav></UserNav> 

<!---- BootStrap RWD HEADER ---->
<div class="container-fluid">
  <div class="row bg-area">
    <div class="col-lg-12 p-0 bg-box">
      <!-- <div class="img-container">
        <img class="img-fluid" src="../assets/images/header.jpg">
      </div> -->


        <!-- <div class="bg-box ">

        </div> -->
        <div>
          <h2 class="header-txt">Buy Fresh<br>at Supermarket</h2>
            <router-link to="/user/allProducts" class="item">
              <button class="header-btn">SHOP</button>
            </router-link>
        </div>


    </div>
  </div>
</div>

<!---- PopUp廣告 ---->
<div id="popup" class="popup-container" v-if="isPopUp" @mousewheel.prevent>
  <div class="popup-img">
    <button type="button" class="close-ad" @click="closeAd">X</button>
    <img class="rounded" src="../assets/images/Home-AD/Popup1.png" alt="">
  </div>
</div>

<!---- 舊HEADER ---->
<!-- <div class="bg-area">
  <div class="bg-box">
    <img src="../assets/images/header.jpg">
  </div>
  <div>
    <h2 class="header-txt">Buy Fresh<br>at Supermarket</h2>
      <router-link to="/user/allProducts" class="item">
        <button class="header-btn">SHOP</button>
      </router-link>
  </div>
</div> -->


<!---- 活動輪播圖 ---->
<div class="container swiper-container">
  <Swiper 
    :modules="[Pagination, Navigation, Autoplay]" 
    :pagination="true"
    :navigation="true"
    :autoplay="{delay: 1500, disableOnInteraction: false}"
    :loop="true"
    :grabCurosr="true">
    <SwiperSlide v-for="(pic, index) in swiperPics" :key="index">
      <img :src="`/src/assets/images/Home-AD/${pic}`" alt="">
    </SwiperSlide>
  </Swiper>
  <!-- <div class="index-banner">
    <div class="index-banner-img-wrapper"><img src="../assets/images/Home-AD/home-AD3.jpg" alt=""></div>
    <div class="index-banner-img-wrapper"><img src="../assets/images/Home-AD/home-AD4.jpg" alt=""></div>
    <div class="index-banner-img-wrapper"><img src="../assets/images/Home-AD/home-AD5.jpg" alt=""></div>    
  </div> -->
</div>

<!---- 新聞 ---->
<HomeNews></HomeNews>

<!---- 關於我們 ---->
<HomeUs></HomeUs>

<!---- 頁尾 ---->
<Footer></Footer>

</template>

<script setup>
// import "~bootstrap/scss/bootstrap";
import {Swiper, SwiperSlide} from 'swiper/vue';
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const swiperPics = [
  "home-AD3.jpg",
  "home-AD4.jpg",
  "home-AD5.jpg",
];

// 導覽列
import UserNav from "../components/UserNav.vue"
// 首頁新聞
import HomeNews from "../components/HomeNews.vue"
// 首頁About US
import HomeUs from "../components/HomeUs.vue"
// 頁尾Footer
import Footer from "../components/Footer.vue";

// 廣告彈跳視窗
import {ref, onMounted} from "vue";
const isPopUp = ref(false);
const showAd = () => {
  isPopUp.value = true;
};
const closeAd = () => {
  isPopUp.value = false;
}
onMounted((event) => {
  setTimeout(showAd, 1000),
  document.addEventListener("click", clickOutside);
});
const clickOutside = (event) => {
  const popupID = document.querySelector("#popup");
  if (popupID && !popupID.contains(event.target)) {
    closeAd();
  }
}
</script>

<style lang="scss" >
@import "../sass/_Home.scss";
// .swiper-container {
//   max-width: 1200px;
//   margin: auto;
//   display: flex;
// }
// /**右邊3廣告 */
// .index-banner {
//   width: 40%;
//   /* outline: 3px red solid; */
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   padding: 10px 10px;
// }
// .index-banner-img-wrapper {
//   /* margin: 10px 0; */
// }
// .index-banner-img-wrapper img {
//   border-radius: 10px;
// }
/*** Swiper輪播圖 ***/
// .swiper{
//   width: 60%;
//   /* height: 400px; */
//   overflow: hidden;
// }
// .swiper-slide {
//   margin: 15px 0;
// }
// .swiper-slide img{
//   width: 100%;
//   /* height:90%; */
//   object-fit:cover;
// }
// .swiper-pagination-bullet {
//   width: 20px;
//   height: 20px;
//   background-color: #fff;
//   opacity: 1;
// }
// .swiper-pagination-bullet-active{
//   background-color: goldenrod;
// }
// .swiper-button-prev {
//   color: goldenrod;
// }
// .swiper-button-next {
//   color: goldenrod;
// }



</style>