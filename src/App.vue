<template>
  <!-- router設定方法，要注意!! -->
  <!-- router將預設頁 App.vue >>Home.Vue -->
  <router-view v-slot="{Component}">
    <component :is="Component" :key="$router.path"></component>  
  </router-view>
</template>

<script setup></script>

<style>
</style>
