<template>
  <!-- About Start -->
  <div class="container-xxl py-5">
    <div class="container">
      <div class="row g-5 align-items-end">
        <div class="col-lg-6">
          <div class="row g-2">
            <div class="col-6 position-relative wow fadeIn" data-wow-delay="0.7s">
              <div class="about-us">
                <h1 class="display-1 mb-0">25</h1>
                <small class="fs-5 fw-bold">Years Experience</small>
              </div>
            </div>
            <div class="col-6 wow fadeIn" data-wow-delay="0.1s">
              <img class="img-fluid rounded" src="/src/assets/images/Home-US/Home-US-1.jpg">
            </div>
            <div class="col-6 wow fadeIn" data-wow-delay="0.3s">
              <img class="img-fluid rounded" src="/src/assets/images/Home-US/Home-US-2.jpg">
            </div>
            <div class="col-6 wow fadeIn" data-wow-delay="0.5s">
              <img class="img-fluid rounded" src="/src/assets/images/Home-US/Home-US-3.jpg">
            </div>
          </div>
        </div>
        <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
          <p class="section-title bg-white text-start text-primary pe-3">About Us</p>
          <h1 class="mb-4">Know About Our Quality & Our History</h1>
          <p class="mb-4">ZOZO provides customers with Fresh and Genuine products. This is our responsibility to fulfill your satisfaction</p>
          <div class="row g-5 pt-2 mb-5">
            <div class="col-sm-6">
              <img class="img-fluid mb-4" src="/src/assets/images/Home-US//icons8-farmer-64.png" alt="">
              <h5 class="mb-3">Dedicated Services</h5>
              <span>Any Produce has QR-Code to show the place where it origins from </span>
            </div>
            <div class="col-sm-6">
              <img class="img-fluid mb-4" src="/src/assets/images/Home-US/icons8-organic-64.png" alt="">
              <h5 class="mb-3">Organic Products</h5>
              <span>They are natural without any pesticides while planting</span>
            </div>
          </div>
          <router-link to="/user/about" class="item">
            <a class="btn btn-secondary rounded-pill py-3 px-5 btn-color" href="">Explore More</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- About End -->
</template>

<script setup>
import router from '../router';
</script>

<style lang="scss" scoped>
@import "../sass/_home-about.scss";
</style>