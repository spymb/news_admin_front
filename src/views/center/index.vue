<template>
  <div>
    <el-page-header content="个人中心" icon="" title="xxx管理系统" />

    <el-row :gutter="20" class="el-row">
      <el-col :span="8">
        <el-card class="box-card">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ userInfo.username }}</h3>
          <h5>{{ userInfo.role === 1 ? "管理员" : "编辑" }}</h5>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>

          <el-form
            ref="userFormRef"
            :model="userForm"
            :rules="userFormRules"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-select
                v-model="userForm.gender"
                class="m-2"
                placeholder="Select"
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
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像" prop="avatar">
              <Upload
                :avatar="userForm.avatar"
                @avatarChange="handleAvatarChange"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/useUserStore";
import { storeToRefs } from "pinia";
import Upload from "@/components/common/Upload.vue";
import { upload } from "@/util";

const userFormRef = ref();

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
const { username, gender, introduction, avatar, file } = userInfo.value;
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  file,
});

const avatarUrl = computed(() =>
  userInfo.value.avatar
    ? "http://localhost:3000" + userInfo.value.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

const handleAvatarChange = (file: Blob) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

const { changeUserInfo } = userStore;
const submitForm = () => {
  userFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await upload("/adminapi/user/upload", userForm);
      if (res.ActionType === "OK") {
        changeUserInfo({...userInfo.value, ...res.data});
        ElMessage.success("更新成功");
      }
    }
  });
};

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
const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }],
});
</script>

<style scoped lang="scss">
.el-row {
  margin-top: 20px;
  .box-card {
    text-align: center;
  }
}
</style>
