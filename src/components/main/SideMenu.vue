<template>
  <el-aside :width="isCollapsed ? '64px' : '240px'">
    <el-menu
      :collapse="isCollapsed"
      :collapse-transition="false"
      router
      :default-active="route.fullPath"
    >
      <el-menu-item index="/home">
        <el-icon><home-filled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <avatar />
        </el-icon>
        <span>个人中心</span>
      </el-menu-item>

      <el-sub-menu index="/user" v-if="userInfo.role === 1">
        <template #title>
          <el-icon>
            <user-filled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/user/add">添加用户</el-menu-item>
        <el-menu-item index="/user/list">用户列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/news">
        <template #title>
          <el-icon>
            <message-box />
          </el-icon>
          <span>新闻管理</span>
        </template>
        <el-menu-item index="/news/add">创建新闻</el-menu-item>
        <el-menu-item index="/news/list">新闻列表</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/product-manage">
        <template #title>
          <el-icon>
            <reading />
          </el-icon>
          <span>产品管理</span>
        </template>
        <el-menu-item index="/product/add">添加产品</el-menu-item>
        <el-menu-item index="/product/list">产品列表</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import {
  HomeFilled,
  Avatar,
  UserFilled,
  MessageBox,
  Reading,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import useCollapseStore from "@/store/useCollapseStore";
import useUserStore from "@/store/useUserStore";
import { storeToRefs } from "pinia";

const { isCollapsed } = storeToRefs(useCollapseStore());

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const route = useRoute();
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;

  .el-menu {
    height: 100vh;
  }
}
</style>
