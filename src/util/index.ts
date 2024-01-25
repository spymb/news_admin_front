import axios from "axios";

type UserForm = {
  username: string;
  password: string;
  role: 1 | 2;
  gender: 0 | 1 | 2; // 0保密, 1男, 2女
  avatar: string;
  file: any;
  introduction: string;
};

export function upload(
  path: string,
  userForm: Partial<UserForm>,
  method: "post" | "put"
) {
  const params = new FormData();
  let i: keyof UserForm;
  for (i in userForm) {
    params.append(i, userForm[i]);
  }

  return axios({
    method,
    url: path,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then((res) => res.data);
}
