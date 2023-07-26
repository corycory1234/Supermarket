import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://vue3-course-api.hexschool.io/api/",
  headers: {
      'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5 * 60 * 1000, // 5 min
});

// API送出之前 (axios攔截)
api.interceptors.request.use(
  //成功之函式
  function (config) {
    const token = Cookies.get("hexToken")
      config.headers['Authorization'] = token;
      return config;
  },
  //失敗之函式
  function (error) {
    return Promise.reject(error);
  }
)

export default api;