import { createRouter, createWebHashHistory } from "vue-router";
import routeList from "./routes";
import useAuthStore from "@/store/useAuthStore";
import { storeToRefs } from "pinia";

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

router.beforeEach((to, from, next) => {
  const autStore = useAuthStore();
  const { isRouterConfigured } = storeToRefs(autStore);
  const { switchRouterConfig } = autStore;

  if (to.name === "login") {
    next();
  } else {
    if (!localStorage.getItem("token")) {
      next({ path: "/login" });
    } else {
      if (!isRouterConfigured.value) {
        configRouter(() => switchRouterConfig(true));
        next({ path: to.fullPath });
      } else {
        next();
      }
    }
  }
});

const configRouter = (callback) => {
  routeList.forEach((route) => {
    router.addRoute("main", route);
  });
  callback();
};

export default router;
