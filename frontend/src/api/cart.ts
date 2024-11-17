import { updateCartType } from "../components/item/CartItem";
import { useAuth } from "../hook/useAuth";
import { AddressHttpReq } from "../routes/_authentication/profile/address/create";
import { CartHttpReq } from "../routes/products/$id";
import axios from "./axios";
import { PaginatedData } from "./types";
export type Cart = {
  id?: string;
  cartId?: string;
  productName: string;
  qty: number;
  productItem?: ProductItem;
  totalPrice?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductItem = {
  id: string;
  qtyInStock: number;
  price: number;
  photoUrl: string;
  size: string;
  color: string;
  sku: string;
};
export const getAllCart = async (): Promise<PaginatedData<Cart>> => {
  const { isUser } = useAuth();
  return await axios
    .get("/cart", {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const create = async (data: CartHttpReq) => {
  const { isUser } = useAuth();
  return axios
    .post("/cart", data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const deleteCart = async (id: string) => {
  const { isUser } = useAuth();
  return axios
    .delete(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const update = async (data: updateCartType) => {
  const { isUser } = useAuth();
  return axios
    .put(`/cart/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const getById = (id: string): Promise<CartHttpReq> => {
  const { isUser } = useAuth();
  return axios
    .get(`/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};
