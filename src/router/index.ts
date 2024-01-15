import { createRouter, createWebHashHistory } from "vue-router";
import routeList from "./routes";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

routeList.forEach((route) => {
  router.addRoute("main", route);
});

export default router;
