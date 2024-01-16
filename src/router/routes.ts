import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/center",
    component: () => import("@/views/center/index.vue"),
  },
  {
    path: "/news/add",
    component: () => import("@/views/news/NewsAdd.vue"),
  },
  {
    path: "/news/list",
    component: () => import("@/views/news/NewsList.vue"),
  },
  {
    path: "/product/add",
    component: () => import("@/views/product/ProductAdd.vue"),
  },
  {
    path: "/product/list",
    component: () => import("@/views/product/ProductList.vue"),
  },
  {
    path: "/user/add",
    component: () => import("@/views/user/UserAdd.vue"),
  },
  {
    path: "/user/list",
    component: () => import("@/views/user/UserList.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default routes;
