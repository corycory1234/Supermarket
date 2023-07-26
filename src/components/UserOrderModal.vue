<template>

  <div class="modal" tabindex="-1" ref="refOpenModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">詳細資訊</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <p>訂單編號: {{ tempOrder.id }}</p>
          <p>注意事項：{{ tempOrder.message }}</p>

          <!---- 巢狀的無法被props過來?? ---->
          <!-- <p>收件人: {{tempOrder.user.name}}</p>
          <p>收件地址: {{tempOrder.user.address}}</p>
          <p>收件人電子信箱: {{tempOrder.user.email}}</p>
          <p>收件人電話: {{tempOrder.user.tel}}</p> -->
        </div>


        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import Modal from "bootstrap/js/dist/modal.js" // 引入Bootstrap的Modal
import {ref, onMounted} from "vue";

// UserOrder.vue父傳子
const props = defineProps({
  tempOrder: {
    type: Object,
    default: () => ({})
  }
});

// 樣板DOM, 點擊跳出訂單視窗
const refOpenModal = ref({});
const orderModal = ref({});
onMounted(()=>{
  orderModal.value = new Modal(refOpenModal.value);
  props.tempOrder;
})
const showModal = ()=>{orderModal.value.show()};
const hideModal = ()=>{orderModal.value.show()};
defineExpose({showModal, hideModal});


</script>