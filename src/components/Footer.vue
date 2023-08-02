<template>
  <div class="footer-dark">
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-sm-6 col-md-3 item">
            <h3>Services</h3>
            <ul>
              <li>
                <router-link to="/user/Allproducts" class="item">
                PRODUCTS
                </router-link>
              </li>

              <li><router-link to="/user/userNews" class="item">NEWS
                  </router-link>
                </li>
              <li>
                <router-link to="/user/userOrder" class="item">MY ORDER
                </router-link></li>
            </ul>
          </div>
          <div class="col-sm-6 col-md-3 item">
            <h3>About</h3>
            <ul>
              <li> <router-link to="/user/about" class="item">
                  OUR TEAM</router-link>
              </li>
            </ul>
          </div>
          <div class="col-md-6 item text">
            <h3>ZOZO</h3>
            <p>This Website is non-benefifial. <br> Practice Only</p>
          </div>
          <div class="col item social">
            <a href="https://www.facebook.com"><i class="bi bi-facebook"></i></a>
            <a href="https://www.twitter.com"><i class="bi bi-twitter"></i></a>
            <a href="https://www.instagram.com"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
        <p class="copyright">ZOZO © 2023</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
@import "../sass/_footer.scss";
</style>