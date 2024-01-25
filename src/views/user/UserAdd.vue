<template>
  <div class="user-add">
    <el-page-header content="添加用户" icon="" title="用户管理" />

    <UserSet v-model:userForm="userForm" ref="userSetRef" />

    <el-button type="primary" @click="addUser">添加</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import UserSet from "@/components/user/UserSet.vue";
import { UserInfo } from "@/store/useUserStore";
import { upload } from "@/util";
import { useRouter } from "vue-router";

const userForm = reactive({} as UserInfo);

const userSetRef = ref<InstanceType<typeof UserSet> | null>(null);

const router = useRouter();

const addUser = async () => {
  const valid = await userSetRef.value?.validate();
  if (valid) {
    await upload("/adminapi/user/add", userForm, "post");
    router.push(`/user/list`);
  }
};
</script>

<style lang="scss" scoped>
.user-add {
  position: relative;
  .user-add-form {
    margin-top: 50px;
  }
  .el-button {
    position: absolute;
    right: 0;
  }
}
</style>
