import { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
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
    meta: {
      requireAdmin: true,
    },
  },
  {
    path: "/user/list",
    component: () => import("@/views/user/UserList.vue"),
    meta: {
      requireAdmin: true,
    },
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

export const loginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login",
  component: () => import("@/views/Login.vue"),
};

export const mainRoute: RouteRecordRaw = {
  path: "/main",
  name: "main",
  component: () => import("@/views/Main.vue"),
};

export default routes;
