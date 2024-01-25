<template>
  <el-form
    ref="userFormRef"
    :model="userForm"
    :rules="userFormRules"
    label-width="80px"
    class="user-add-form"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="userForm.username" placeholder="请输入" />
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input
        v-model="userForm.password"
        type="password"
        placeholder="请输入"
      />
    </el-form-item>

    <el-form-item label="角色" prop="role">
      <el-select
        v-model="userForm.role"
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in roleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="gender">
      <el-select
        v-model="userForm.gender"
        class="m-2"
        placeholder="请选择"
        style="width: 100%"
      >
        <el-option
          v-for="item in genderOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="个人简介" prop="introduction">
      <el-input
        v-model="userForm.introduction"
        type="textarea"
        placeholder="请输入"
      />
    </el-form-item>

    <el-form-item label="头像" prop="avatar">
      <Upload :avatar="userForm.avatar" @avatarChange="handleAvatarChange" />
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Upload from "@/components/common/Upload.vue";
import { UserSetInfo } from "@/types";

const userForm = defineModel<UserSetInfo>("userForm", {
  required: true,
  default: {},
});

const userFormRef = ref();

const handleAvatarChange = (file: Blob) => {
  userForm.value.avatar = URL.createObjectURL(file);
  userForm.value.file = file as any;
};

const validate = () => userFormRef.value.validate((valid: boolean) => valid);

defineExpose({
  validate,
});

const roleOptions = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];

const genderOptions = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

const userFormRules = {
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  role: [{ required: true, message: "请选择权限", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
};
</script>

<style lang="scss" scoped></style>
