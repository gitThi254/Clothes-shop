import { useAuth } from "../hook/useAuth";
import { AddressHttpReq } from "../routes/_authentication/profile/address/create";
import axios from "./axios";
import { PaginatedData } from "./types";
export type AddressHttpRes = {
  id: string;
  xa: string;
  diaChi: string;
  tinh: string;
  quan: string;
};
export const getAllAddress = async (): Promise<
  PaginatedData<AddressHttpRes>
> => {
  const { isUser } = useAuth();
  return await axios
    .get("/address", {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const create = async (data: AddressHttpReq) => {
  const { isUser } = useAuth();
  return axios
    .post("/address", data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const deleteAddress = async (id: string) => {
  const { isUser } = useAuth();
  return axios
    .delete(`/address/${id}`, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const update = async (data: AddressHttpReq) => {
  const { isUser } = useAuth();
  return axios
    .put(`/address/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const getById = (id: string): Promise<AddressHttpReq> => {
  const { isUser } = useAuth();
  return axios
    .get(`/address/${id}`, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};
