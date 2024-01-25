<template>
  <el-card>
    <el-page-header content="用户列表" icon="" title="用户管理" />

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180" />

      <el-table-column label="头像" width="180">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar
              :size="50"
              :src="'http://localhost:3000' + scope.row.avatar"
            ></el-avatar>
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="角色">
        <template #default="scope">
          <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger"
            >管理员</el-tag
          >

          <el-tag v-else class="ml-2" type="success">编辑</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="openEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            title="确定删除吗?"
            @confirm="confirmDelete(scope.row)"
            confirm-button-text="是"
            cancel-button-text="否"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="50%"
      destroy-on-close
    >
      <UserSet v-model:userForm="curUserForm" ref="userSetRef" />

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import UserSet from "@/components/user/UserSet.vue";
import { UserSetInfo } from "@/types";
import { upload } from "@/util";
import { cloneDeep } from "lodash";

const tableData = ref([]);
const dialogVisible = ref(false);
const curUserForm = ref<UserSetInfo>({});
const userSetRef = ref<InstanceType<typeof UserSet> | null>(null);

const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  tableData.value = res.data.data;
};

const openEdit = (data: UserSetInfo) => {
  dialogVisible.value = true;
  curUserForm.value = cloneDeep(data);
};
const confirmEdit = async () => {
  const valid = await userSetRef.value?.validate();
  if (valid) {
    await upload(
      `/adminapi/user/list/${curUserForm.value._id}`,
      curUserForm.value,
      "put"
    );
    dialogVisible.value = false;
    getTableData();
  }
};
const confirmDelete = async (data: any) => {
  await axios.delete(`/adminapi/user/list/${data._id}`);
  getTableData();
};

onMounted(() => {
  getTableData();
});
</script>
