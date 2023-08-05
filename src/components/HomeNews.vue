<template>
  <!-- News With Sidebar Start -->
  <div class="container-fluid mt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-12">
              <div class="section-title1">
                <h4 class="m-0 font-weight-bold">LATEST NEWS</h4>
                <a class="text-secondary font-weight-medium text-decoration-none" href="">
                  <router-link to="/user/userNews" >
                    View All
                  </router-link>
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="position-relative mb-3">
                <img class="img-fluid w-100" src="../assets/images/NEWS/NEWS1.jpg">
                <div class="bg-white border border-top-0 p-4">
                  <div class="mb-2">
                    <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2" href="">Business</a>
                    <a class="text-body" href=""><small>Jan 01, 2045</small></a>
                  </div>
                  <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">
                    Typhoon comes Today </a>
                  <p class="m-0">Stuff On Shelves are all empty after the typhoon came from West Coast. We will supply goods ASAP.</p>
                </div>
                <div class="d-flex justify-content-between align-items-center bg-white border border-top-0 p-4">
                  <div>
                    <img class="rounded-circle mr-2" src="../assets/images/NEWS/pp100x100.jpg" width="40"  alt="">
                    <small class="px-1">Boss</small>
                  </div>
                  <div>
                    <button class="btnbtn" @click="readMore('-N_CCoLjYfinZI5ZJ5tJ')">READ MORE</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="position-relative mb-3">
                <img class="img-fluid w-100" src="../assets/images/NEWS/NEWS2.jpg">
                <div class="bg-white border border-top-0 p-4">
                  <div class="mb-2">
                    <a class="badge badge-primary text-uppercase font-weight-semi-bold p-2 mr-2" href="">Business</a>
                    <a class="text-body" href=""><small>Jan 01, 2045</small></a>
                  </div>
                  <a class="h4 d-block mb-3 text-secondary text-uppercase font-weight-bold" href="">
                    PETS ARE NOT ALLOWED
                  </a>
                  <p class="m-0">Please tie your pets outside. It's prohibited  let them step inside. Get Fine with $1,000 if violate the rule</p>
                </div>
                <div class="d-flex justify-content-between align-items-center bg-white border border-top-0 p-4">
                  <div>
                    <img class="rounded-circle mr-2" src="../assets/images/NEWS/pp100x100.jpg" width="40" alt="">
                    <small class="px-1">Boss</small>
                  </div>
                  <div>
                    <button class="btnbtn" @click="readMore('-N_CDG4_Z-XfxjBDoOUl')">READ MORE</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div class="col-lg-4">
          <!-- Social Follow Start -->
          <div class="mb-3">
            <div class="section-title1 mb-0">
              <h4 class="m-0 text-uppercase font-weight-bold">Follow Us</h4>
            </div>
            <div class="bg-white border border-top-0 p-3">
              <a href="https://www.facebook.com" class="d-block w-100 text-white text-decoration-none mb-3" style="background: #39569E;">
                <i class="bi bi-facebook m-2"></i>
                <span class="font-weight-medium">12,345 Fans</span>
              </a>
              <a href="https://www.twitter.com" class="d-block w-100 text-white text-decoration-none mb-3" style="background: #52AAF4;">
                <i class="bi bi-twitter m-2"></i>
                <span class="font-weight-medium">12,345 Followers</span>
              </a>
              <a href="https://line.me/zh-hant/" class="d-block w-100 text-white text-decoration-none mb-3" style="background: #0185AE;">
                <i class="bi bi-line m-2"></i>
                <span class="font-weight-medium">12,345 Connects</span>
              </a>
              <a href="https://www.instagram.com" class="d-block w-100 text-white text-decoration-none mb-3" style="background: #C8359D;">
                <i class="bi bi-instagram m-2"></i>
                <span class="font-weight-medium">12,345 Followers</span>
              </a>
              <a href="https://www.google.com" class="d-block w-100 text-white text-decoration-none mb-3" style="background: #DC472E;">
                <i class="bi bi-google m-2"></i>
                <span class="font-weight-medium">12,345 Subscribers</span>
              </a>
              <a href="https://www.linkedin.com" class="d-block w-100 text-white text-decoration-none" style="background: #055570;">
                <i class="bi bi-linkedin m-2"></i>
                <span class="font-weight-medium">12,345 Followers</span>
              </a>
            </div>
          </div>
          <!-- Social Follow End -->

          <div>
            <div class="section-title1 mb-0">
              <h4 class="m-0">ADVERTISEMENT</h4>
            </div>
            <div class="text-center border border-top-0 p-3">
              <router-link to="/user/Allproducts" class="item">
                <div class="img-container">
                  <img class="rounded" style="height: 250px" src="../assets/images/NEWS/345.jpg" alt="">
                </div>
              </router-link>
            </div>
          </div>



        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
// ReadMore 讀取單一新聞
import router from "../router/index.js";
const readMore = (id) => {
  router.push(`/user/userNews/${id}`)
};
</script>

<style lang="scss" scoped>
@import "../sass/_home-news.scss";
</style>