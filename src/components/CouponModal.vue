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
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                   placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                   placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
                   v-model="due_date"
                   >
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
                   v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比"
                   max="100">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     v-model="tempCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-coupon', tempCoupon)">更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import Modal from "bootstrap/js/dist/modal.js"; 
import {ref, watch, onMounted} from "Vue";

// 樣板DOM, 點擊跳Modal視窗, 並defineExpose把ref屬性傳給父元件coupon.vue
const refOpenModal = ref({}); // 樣板的DOM
const couponModal = ref({}); // 透過new Modal, 接收DOM
onMounted(() => {
  couponModal.value = new Modal(refOpenModal.value); //樣板DOM & BS的Modal功能, 傳值給 couponModal
});
const showModal = () => {couponModal.value.show()};
const hideModal = () => {couponModal.value.hide()};
defineExpose({showModal, hideModal})

// Props & Emits
const props = defineProps({coupon: Object});
// const props = defineProps(["coupon"]);
// Emits 新增優惠券
defineEmits(["update-coupon"]);

// watch監聽
const tempCoupon = ref({});
const due_date = ref("");
watch(  // 將 due_date 轉成符合 Modal 的格式（yyyy-mm-dd), 打開 CouponModal 就會觸發
  ()=> props.coupon, // props.coupon外面不用包{}
  ()=>{
    tempCoupon.value = props.coupon;
     // 這邊拿到的是「秒」, *1000可轉「毫秒」,以符合JS的時間戳格式; 若沒*1000, Modal視窗到期日會變1970
    const dateAndTime = new Date(tempCoupon.value.due_date *1000)
    .toISOString().split("T"); // 修正時區，因地制宜; split可把ISOString的"T"拿掉, 並轉成Arr型別
    [due_date.value] = dateAndTime; // 用 [] 包起來是改為 object 的格式，這樣才能符合 input type="date" 的形式
  },
);

watch(  // due_date 轉成適合父元件Coupon.vue儲存的格式(毫秒),只要打開 CouponModal 就會觸發
  () => due_date.value,
  (new_due_date) => {
    // 除1000 >> 取得"秒", 才能成功「渲染」正確當下日期; 若沒除1000,渲染到期日會變成 毫秒
    tempCoupon.value.due_date = Math.floor(new Date(new_due_date) /1000); 
  }
)

</script>