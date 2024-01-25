import { UserInfo } from "@/store/useUserStore";

export type UserSetInfo = { _id?: string } & Partial<UserInfo>;
