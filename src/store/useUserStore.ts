import { defineStore } from "pinia";
import { ref } from "vue";

export type UserInfo = {
  username: string;
  password: string;
  role: 1 | 2; // 管理员1 ,编辑2
  gender: 0 | 1 | 2; // 0保密, 1男, 2女
  introduction: string;
  avatar: string;
  file: Blob;
};

const useUserStore = defineStore(
  "user",
  () => {
    // state
    const userInfo = ref<UserInfo>({} as UserInfo);

    // actions
    const changeUserInfo = (info: UserInfo) => {
      userInfo.value = info;
    };
    const clearUserInfo = () => {
      userInfo.value = {} as UserInfo;
    };

    return {
      userInfo,
      changeUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);

export default useUserStore;
