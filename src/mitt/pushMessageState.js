import emitter from "./emitter.js";

export default function(response, title="更新") {
  if(response.data.success) {
    emitter.emit("push-message", {
      style: "success",
      title:  `${title}成功!`
    })
  };
}