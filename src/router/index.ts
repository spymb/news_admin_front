import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import { routes as routeList, loginRoute, mainRoute } from "./routes";
import useAuthStore from "@/store/useAuthStore";
import useUserStore from "@/store/useUserStore";
import { storeToRefs } from "pinia";

const coreRoutes = [loginRoute, mainRoute];

const router = createRouter({
  history: createWebHashHistory(),
  routes: coreRoutes,
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
        configRouter();
        switchRouterConfig(true);
        next({ path: to.fullPath });
      } else {
        next();
      }
    }
  }
});

const configRouter = () => {
  router.removeRoute("main");

  router.addRoute({
    path: "/main",
    name: "main",
    component: () => import("@/views/Main.vue"),
  });

  routeList.forEach((route) => {
    checkPermission(route) && router.addRoute("main", route);
  });
};

const checkPermission = (route: RouteRecordRaw) => {
  if (route?.meta?.requireAdmin) {
    const userStore = useUserStore();
    const { userInfo } = storeToRefs(userStore);
    return userInfo.value.role === 1;
  }
  return true;
};

export default router;
