<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import TopHeader from "@/components/main/TopHeader.vue";
import SideMenu from "@/components/main/SideMenu.vue";
</script>
