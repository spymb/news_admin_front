import axios from "axios";

type UserForm = {
  username: string;
  gender: 0 | 1 | 2; // 0保密, 1男, 2女
  introduction: string;
  avatar: string;
  file: any;
};

export function upload(path: string, userForm: UserForm) {
  const params = new FormData();
  let i: keyof UserForm;
  for (i in userForm) {
    params.append(i, userForm[i]);
  }
  return axios
    .post(path, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}
