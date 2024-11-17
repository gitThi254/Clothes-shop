import { Filters, PaginatedData } from "./types";
import qs from "qs";
import axios from "./axios";
import { Product } from "../table/columns/productColumns";
import { ProductItem } from "../table/columns/productItemColumns";
import { ProductItemHttpReq } from "../routes/_admin/admin/(hidden-folder)/products/$id/item/create";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

export type ProductItemFilters = Filters<ProductItem>;

export async function fetchProductItems({
  id,
  filtersAndPagination,
}: {
  id: string;
  filtersAndPagination: ProductItemFilters;
}): Promise<PaginatedData<ProductItem>> {
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
    .get(`/product/${id}/item${queryString ? `?${queryString}` : ""}`)
    .then((res) => {
      return res.data;
    });
  return data;
}

export const create = async ({
  id,
  data,
}: {
  id: string;
  data: ProductItemHttpReq;
}) => {
  return axios.post(`/admin/product/${id}/item`, data).then((res) => res.data);
};
// export const updateImage = async (data: FormData) => {
//   return await axios.put("/admin/product/photo", data);
// };

export const updateItem = async ({
  id,
  data,
}: {
  id: string;
  data: ProductItem;
}) => {
  return axios.put(`/admin/product/${id}/item/${data.id}`, data);
};

export const deleteProductItem = async ({
  id,
  itemId,
}: {
  id: string;
  itemId: string;
}) => {
  return axios.delete(`/admin/product/${id}/item/${itemId}`);
};

export const getById = ({
  id,
  itemId,
}: {
  id: string;
  itemId: string;
}): Promise<ProductItem> => {
  return axios.get(`/product/${id}/item/${itemId}`).then((res) => res.data);
};

export const updateImageItem = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  return await axios.put(`/admin/product/${id}/item/photo`, data);
};
