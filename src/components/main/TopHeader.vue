<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapsed">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px">企业门户网站管理系统</span>
    </div>
    <div class="right">
      <span>欢迎 admin 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="30" color="white">
            <user />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { Menu, User } from "@element-plus/icons-vue";
import useCollapseStore from "@/store/useCollapseStore";
import useUserStore from "@/store/useUserStore";
import { storeToRefs } from "pinia";

const collapseStore = useCollapseStore();
const { isCollapsed } = storeToRefs(collapseStore);
const { switchCollapsed } = collapseStore;
const handleCollapsed = () => {
  switchCollapsed(!isCollapsed.value);
};

const router = useRouter();
const handleCenter = () => {
  router.push("/center");
};
const { clearUserInfo } = useUserStore();
const handleLogout = () => {
  localStorage.removeItem("token");
  clearUserInfo()
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #2d3a4b;
  color: white;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left,
.right {
  display: flex;
}

.left {
  i {
    margin: auto;
    cursor: pointer;
  }
}
.right {
  .el-dropdown {
    margin: auto;
  }
}
</style>
