<template>

<div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="refOpenModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!--- 輸入標題 --->
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempNews.title"
                   placeholder="請輸入標題">
          </div>

          <!--- 上傳圖片 --->
          <div class="mb-3">
            <label for="customFile" class="form-label">上傳圖片
              <i class="fas fa-spinner fa-spin"></i>
            </label>
            <input type="file" id="customFile" class="form-control"
              ref="fileInput"
              @change="uploadFile"/>
          </div>
          <img class="img-fluid" :src="tempNews.image" alt="" />

          <!--- 作者姓名 --->
          <div class="mb-3">
            <label for="author">作者</label>
            <input type="text" class="form-control" id="author" v-model="tempNews.author"
              placeholder="請輸入作者姓名">
          </div>

          <!--- 日期INPUT --->
          <div class="mb-3">
            <label for="released_day">發行日</label>
            <input type="date" class="form-control" id="released_day"
              v-model="released_day">
          </div>

           <!--- 是否刊登BOOLEAN --->
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                v-model="tempNews.isPublic"
                :true-value=true
                :false-value=false
                id="isPublic"/>
              <label class="form-check-label" for="isPublic">是否刊登</label>
              </div>
          </div>

          <!--- 新聞簡短描述 --->
          <div class="mb-3">
            <label for="content" class="form-label">簡短描述</label>
            <textarea type="text" class="form-control" id="content"
              v-model="tempNews.description"
              placeholder="請輸入簡短描述">
            </textarea>
          </div>

          <!--- 新聞內容 --->
          <div class="mb-3">
            <label for="content" class="form-label">新聞內容</label>
            <textarea type="text" class="form-control" id="content"
              v-model="tempNews.content"
              placeholder="請輸入新聞內容">
            </textarea>
          </div>
        </div>

        <!--- 更新文章按鈕 --->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
            @click="$emit('update-news', tempNews)">更新文章
          </button>
        </div>

      </div>
    </div>
  </div>

</template>
<script setup>
import axios from 'axios';
import {ref, onMounted, defineExpose, watch} from "Vue";
import Modal from "bootstrap/js/dist/modal.js"; 

// 取得Modal視窗的DOM, 並defineExpose把ref屬性傳給父元件News.vue
const refOpenModal = ref({});
const newsModal = ref({});
onMounted(() => {
  newsModal.value = new Modal (refOpenModal.value);
})
const showModal = () => {newsModal.value.show()};
const hideModal = () => {newsModal.value.hide()};
defineExpose({showModal, hideModal});

// props收父元件News.vue
const props = defineProps({
  news: {
    type: Object,
  }
});

// Emits新聞
defineEmits(["update-news"]);

// Watch監聽
const tempNews = ref({});
const released_day = ref("");
watch(
  () => props.news,
  () => {
    tempNews.value = props.news;
    const dateAndTime = new Date(tempNews.value.create_at *1000)
    .toISOString().split("T");
    [released_day.value] = dateAndTime;
  }
);

watch(
  () => released_day.value,
  (new_released_date) => {
    tempNews.value.create_at = Math.floor(new Date(new_released_date) / 1000);
  }
)

// 上傳圖片
const fileInput = ref(); // 抓DOM的ref變數, 只能寫在「全域」,才能抓到DOM
function uploadFile(){
  // console.dir(fileInput.value); // 查看input, 是Arr陣列
  const formData = ref(new FormData()); // 上傳圖片, 一定要帶FormData!
  formData.value.append('file-to-upload', fileInput.value.files[0]); // ("API文件當中的name屬性", 要傳給API的檔案)
  const imgApi = `${import.meta.env.VITE_API_SERVER}api/${import.meta.env.VITE_APP_PATH}/admin/upload`
  axios.post(imgApi, formData.value)
    .then((response) => {
      if(response.data.success){
        tempNews.value.image = response.data.imageUrl; //有bug, 再次編輯, Url會殘留
      };
    });
};





</script>