<template>
<nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled : currentPage <=1}">
        <a class="page-link" href="#" aria-label="Previous"
        @click.prevent="previousPage()">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <li class="page-item" 
      v-for="(page) in props.pages.total_pages"
      :key="page"
      :class="{active : page === currentPage}">
        <a class="page-link" href="#" @click.prevent="clickPage(page)">
        {{ page }}</a>
      </li>

      <li class="page-item" :class="{disabled : currentPage === pageLength}">
        <a class="page-link" href="#" aria-label="Next"
        @click.prevent="nextPage()">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref} from "vue"
const props = defineProps(["pages", "currentPageProps", "pageLength"]); //其實currentPageProps這邊用不到, currentPage可以emit出去即可
const emits = defineEmits(["emit-pages", "go-previous", "go-next"]);
const currentPage = ref(1); // 不可拿父元件的currentPageProps做-- or ++, 因子元件不可改父元件DATA

// 當前頁面
const clickPage = (page) => {
  currentPage.value = page;
  emits("emit-pages", page);
};

// 上一頁
const previousPage = () => {
  currentPage.value -=1;
  emits("go-previous", currentPage.value)
}

//下一頁
const nextPage = () => {
  currentPage.value +=1; 
  emits("go-next", currentPage.value)
}

</script>