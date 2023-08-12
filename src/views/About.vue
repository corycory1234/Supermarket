<template>
  <!-- HEADER START -->
  <div class="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
    <div class="container text-center py-5">
      <h1 class="display-3 text-white mb-4 animated slideInDown">ABOUT US</h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol class="breadcrumb justify-content-center mb-0">
          <li class="breadcrumb-item">
            <router-link :to="{ name: 'home' }" class="item">HOME</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            <router-link to="/user/about" class="item">ABOUT US</router-link></li>
        </ol>
      </nav>
    </div>
  </div>
  <!-- HEADER END -->

  <HomeUs></HomeUs>

  <!-- BANNER -->
  <div class="container-fluid banner my-5 py-5" data-parallax="scroll" data-image-src="img/banner.jpg">
    <div class="container py-5">
      <div class="row g-5">
        <div class="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
          <div class="row g-4 align-items-center">
            <div class="col-sm-4">
              <img class="img-fluid rounded" src="../assets/images/ABOUT/about-Banner3.jpg" alt="">
            </div>
            <div class="col-sm-8">
              <h2 class="text-black mb-3">We Sell Fresh Fish Daily</h2>
              <p class="text-black mb-4">They are from West Coast and we freeze the prey on the way of delivery!</p>
              <router-link to="/user/userNews/-NbbXEqcwoc1xELS9wsY">
                <a class="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
              </router-link>

            </div>
          </div>
        </div>
        <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <div class="row g-4 align-items-center">
            <div class="col-sm-4">
              <img class="img-fluid rounded" src="../assets/images/ABOUT/about-Banner4.jpg" alt="">
            </div>
            <div class="col-sm-8">
              <h2 class="text-black mb-3">Tender Meats meet your need</h2>
              <p class="text-black mb-4">Get Any cuts of pork, beef and chicken Here!</p>
              <router-link to="/user/userNews/-NbbZc6g9LzfeXxvATzP">
                <a class="btn btn-secondary rounded-pill py-2 px-4" href="">Read More</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- BANNER -->


  <!-- Team Start -->
  <div class="container-xxl py-5">
    <div class="container">
      <div class="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style="max-width: 500px;">
        <p class="section-title bg-white text-center text-primary px-3">Our Team</p>
        <h1 class="mb-5">Experienced Team Members</h1>
      </div>
      <div class="row g-4">
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="team-item rounded p-4">
            <img class="img-fluid rounded mb-4" src="../assets/images/ABOUT/about-Team5.jpg" alt="">
            <h5 class="team-txt">Adam Crew</h5>
            <p class="text-primary team-txt">Founder</p>
            <div class="d-flex justify-content-center">
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com">
                <i class="bi bi-facebook"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com">
                <i class="bi bi-instagram"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.twitter.com">
                <i class="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div class="team-item rounded p-4">
            <img class="img-fluid rounded mb-4" src="../assets/images/ABOUT/about-Team4.jpg" alt="">
            <h5 class="team-txt">Doris Jordan</h5>
            <p class="text-primary team-txt">Veterinarian</p>
            <div class="d-flex justify-content-center">
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com">
                <i class="bi bi-facebook"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com">
                <i class="bi bi-instagram"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.twitter.com">
                <i class="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div class="team-item rounded p-4">
            <img class="img-fluid rounded mb-4" src="../assets/images/ABOUT/about-Team3.jpg" alt="">
            <h5 class="team-txt">Jack Dawson</h5>
            <p class="text-primary team-txt">Farmer</p>
            <div class="d-flex justify-content-center">
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.facebook.com">
                <i class="bi bi-facebook"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.instagram.com">
                <i class="bi bi-instagram"></i>
              </a>
              <a class="btn btn-square btn-outline-secondary rounded-circle mx-1" href="https://www.twitter.com">
                <i class="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Team End -->

  
  <!---- FOOTER ---->
  <Footer></Footer>
</template>



<script setup>
import HomeUs from "../components/HomeUs.vue"
import Footer from "../components/Footer.vue"
</script>

<style lang="scss" scoped>
@import "../sass/_about.scss";
</style>