import Modal from "bootstrap/js/dist/modal.js";
import {defineStore} from "pinia";


export default defineStore("useModalStore", {
  actions: {
    showModal () {
      this.modal.show()
    },

    hideModal () {
      this.modal.hide()
    }
  }
})