<template>
  <!-- ref="modal" 取得DIV這一大包DOM元素-->
  <div class="modal fade" 
  id="exampleModal" 
  tabindex="-1" 
  aria-labelledby="exampleModalLabel" 
  aria-hidden="true"
  ref="refOpenModal">
  
  <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel"><span>新增產品</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @change="uploadFile"
                />
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.images">
                <div v-for="(image, key) in tempProduct.images" class="mb-3 input-group" :key="key">
                  <input
                    type="url"
                    class="form-control form-control"
                    v-model="tempProduct.images[key]"
                    placeholder="請輸入連結"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="tempProduct.images.splice(key, 1)"
                  >
                    移除
                  </button>
                </div>
                <div
                  v-if="
                    tempProduct.images[tempProduct.images.length - 1] || !tempProduct.images.length
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.images.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    v-model.number="tempProduct.origin_price"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    type="number"
                    class="form-control"
                    id="price"
                    v-model.number="tempProduct.price"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal"> 取消</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)">確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Modal from "bootstrap/js/dist/modal.js" // 引入Bootstrap的Modal
import { ref, onMounted, watch} from 'vue';

// 樣板DOM, 點擊跳出Modal視窗, 並defineExpose把ref屬性傳給父元件Products.vue
const refOpenModal = ref({}); // 樣板的DOM
const productModal = ref({}); // 透過new Modal, 接收DOM
onMounted(() => {
  productModal.value = new Modal(refOpenModal.value); //樣板DOM & BS的Modal功能, 傳值給 productModal
});
const showModal = () => {productModal.value.show()};
const hideModal = () => {productModal.value.hide()};


// props接收父元件Products.vue
const tempProduct = ref({});
const props = defineProps({
  product: {
    type: Object,
    default: () => ({}) //預設值, 回傳空OBJ
  }
})
watch(
  () => {props.product},
  // tempProduct.value = props.product, //props傳進資料, 存放在tempProduct
  () => {tempProduct.value = JSON.parse(JSON.stringify(props.product))}, //用深層拷貝, 不知是否OK
  {deep: true}
);
defineExpose({showModal, hideModal, tempProduct});

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
        tempProduct.value.imageUrl = response.data.imageUrl; //有bug, 再次編輯, Url會殘留
      };
    });
};
</script> 