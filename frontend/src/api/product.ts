import { Filters, PaginatedData } from "./types";
import qs from "qs";
import axios from "./axios";
import { Product } from "../table/columns/productColumns";
import { ProducUpdatetHttpReq } from "../routes/_admin/admin/products/$id";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

export type ProductFilters = Filters<Product>;

export async function fetchProducts(
  filtersAndPagination: ProductFilters
): Promise<PaginatedData<Product>> {
  const {
    pageIndex = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    sortBy,
    ...filters
  } = filtersAndPagination;
  const sort = sortBy?.split(".");
  const queryString = qs.stringify(
    sort
      ? {
          ...filters,
          sort: sort ? sort[0] : null,
          order: sort ? sort[1].toLocaleUpperCase() : null,
          pageIndex,
          pageSize,
        }
      : {
          ...filters,
          pageIndex,
          pageSize,
        }
  );
  const data = await axios
    .get(`/product${queryString ? `?${queryString}` : ""}`)
    .then((res) => {
      return res.data;
    });
  return data;
}
export type Message = {
  message: string;
};
export const create = async (data: any): Promise<Message> => {
  return axios.post("/admin/product", data).then((res) => res.data);
};
export const updateImage = async (data: FormData) => {
  return await axios.put("/admin/product/photo", data);
};

export const update = async (data: ProducUpdatetHttpReq) => {
  return axios.put(`/admin/product/${data.id}`, data);
};

export const deleteProduct = async (id: string) => {
  return axios.delete(`/admin/product/${id}`);
};

export const getById = (id: string): Promise<ProducUpdatetHttpReq> => {
  return axios.get(`/product/${id}`).then((res) => res.data);
};

export interface Root {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  photoUrl: string;
  totalItems: number;
  totalQty: number;
  min: number;
  max: number;
  productItems: ProductItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductItem {
  id: string;
  qtyInStock: number;
  price: number;
  photoUrl: string;
  size: string;
  color: string;
  sku: string;
}

export const getProduct = (id: string): Promise<Root> => {
  return axios.get(`/product/${id}`).then((res) => res.data);
};
