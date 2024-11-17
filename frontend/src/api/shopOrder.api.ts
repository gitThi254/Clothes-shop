import { useAuth } from "../hook/useAuth";
import { CartHttpreq } from "../routes/_authentication/cart";
import axios from "./axios";

import { Filters, PaginatedData } from "./types";
import qs from "qs";
import { ShopOrder } from "../table/columns/shopOrderColumns";
import { ShopOrderDetailsType } from "../routes/_admin/admin/order/$id";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

export type ShopOrderFilters = Filters<ShopOrder>;

export async function fetchShopOrders(
  filtersAndPagination: ShopOrderFilters
): Promise<PaginatedData<ShopOrder>> {
  const { isUser } = useAuth();

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
    .get(`/shop-order${queryString ? `?${queryString}` : ""}`, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => {
      return res.data;
    });
  return data;
}

export async function fetchAdminShopOrders(
  filtersAndPagination: ShopOrderFilters
): Promise<PaginatedData<ShopOrder>> {
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
    .get(`/admin/shop-order${queryString ? `?${queryString}` : ""}`)
    .then((res) => {
      return res.data;
    });
  return data;
}

export const createOrder = async (data: CartHttpreq) => {
  const { isUser } = useAuth();

  return await axios
    .post("/shop-order", data, {
      headers: {
        Authorization: `Bearer ${isUser()?.jwt}`,
      },
    })
    .then((res) => res.data);
};

export const getById = (id: string): Promise<ShopOrderDetailsType> => {
  return axios.get(`/admin/shop-order/${id}`).then((res) => res.data);
};
export type UpdateShopOrderType = {
  id: string;
  orderStatusId: string;
};
export const update = (
  data: UpdateShopOrderType
): Promise<ShopOrderDetailsType> => {
  return axios
    .put(`/admin/shop-order/${data.id}`, data)
    .then((res) => res.data);
};
