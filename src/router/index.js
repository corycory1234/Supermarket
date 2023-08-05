import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import ("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import ("../views/Login.vue")
  },
  {
    path: "/Dashboard",
    name: "dashboard",
    component: () => import ("../views/Dashboard.vue"),
    children: [
      {
        path: "Products", // 後臺商品
        component: () => import ("../views/Products.vue")
      },
      {
        path: "coupons", // 後臺優惠券
        component: () => import("../views/Coupon.vue")
      },
      {
        path: "orders", // 後臺訂單
        component: () => import("../views/Orders.vue")
      },
      {
        path:"news",  // 後臺新聞
        component: () => import("../views/News.vue")
      },
    ]
  },

  {
    path: "/user",
    name: "user",
    component: () => import("../views/UserBoard.vue"),
    children: [
      {
        path: "Allproducts", // 所有商品
        component: () => import ("../views/UserProducts.vue")
      },
      {
        path: "product/:productId", // 單一商品(看更多)
        component: () => import ("../views/SeeMore.vue")
      },
      {
        name: "order", // 我的訂單
        path: "checkout/:orderId",
        component: () => import ("../views/UserCheckOut.vue")
      },
      {
        path: "cart2", // 購物車
        component: () => import ("../views/Cart.vue")
      },
      {
        path: "userOrder",  // 我的訂單
        component: () => import ("../views/UserOrder.vue")
      },
      {
        path: "userNews", // 最新活動
        component: () => import ("../views/UserNews.vue")
      },
      {
        path: "userNews/:newsId", // ReadMore新聞
        component: () => import ("../views/ReadMoreNews.vue")
      },
      {
        path: "about",  // 關於我們
        component: () => import ("../views/About.vue")
      },
      {
        path: "favorite", // 我的收藏
        component: () => import ("../views/Favorite.vue")
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router