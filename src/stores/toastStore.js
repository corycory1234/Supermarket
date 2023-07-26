import {defineStore} from "pinia";

export default defineStore ("useToastStore", {
  actions:{
    success(response, title="新增"){
      if (response.data.success) {
        refModal.value.hideModal(); // 新增完 >> 關掉Modal視窗
        isLoading.value = false;
        getProducts();
        emitter.emit("push-message", {
          style: "success",
          title: "新增成功!"
        })
      }else{
        
      }
    }
  }
})