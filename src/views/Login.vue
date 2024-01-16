<template>
  <div>
    login
    <button @click="setToken">登录</button>
  </div>
</template>

<script setup lang="ts">
const setToken = () => {
  localStorage.setItem("token", "xxx");
};
</script>

<style lang="scss" scoped></style>
