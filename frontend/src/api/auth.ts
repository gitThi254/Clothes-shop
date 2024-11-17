import { useAuth } from "../hook/useAuth";
import { Login } from "../routes/_notAuth/login";
import { User } from "../table/columns/userColumns";
import axios from "./axios";

export type LoginHttpRes = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  username?: string;
  password?: string;
  role?: string;
  jwt?: string;
  cartId?: string;
};
export type UserHttpReq = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
};
export type UserHttpRes = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
};

export const register = async ({
  data,
}: {
  data: UserHttpReq;
}): Promise<UserHttpRes> => {
  return axios.post(`/auth/register`, data).then((res) => res.data);
};

export const login = async ({
  data,
}: {
  data: Login;
}): Promise<LoginHttpRes> => {
  return axios.post(`/auth/login`, data).then((res) => res.data);
};

export const updateProfile = (data: LoginHttpRes): Promise<LoginHttpRes> => {
  const { isUser } = useAuth();

  return axios
    .put(`/profile`, data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};
