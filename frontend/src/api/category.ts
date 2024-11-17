import { Filters, PaginatedData } from "./types";
import qs from "qs";
import axios from "./axios";
import { Category } from "../table/columns/categoryColumns";
import { CategoryHttpReq } from "../routes/_admin/admin/category/create";
import { useAuth } from "../hook/useAuth";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

export type CategoryFilters = Filters<Category>;

export async function fetchCategories(
  filtersAndPagination: CategoryFilters
): Promise<PaginatedData<Category>> {
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
    .get(`/category${queryString ? `?${queryString}` : ""}`)
    .then((res) => {
      return res.data;
    });
  return data;
}

export type SelectReq = {
  id: string;
  name: string;
};

export const create = async (data: CategoryHttpReq) => {
  return axios.post("/admin/category", data);
};

export const update = async (data: Category) => {
  return axios.put(`/admin/category/${data.id}`, data);
};

export const deleteCategory = async (id: string) => {
  return axios.delete(`/admin/category/${id}`);
};

export const getById = (id: string): Promise<Category> => {
  return axios.get(`/category/${id}`).then((res) => res.data);
};

export const selectCategory = async (): Promise<SelectReq[]> => {
  return await axios.get(`/category/select`).then((res) => res.data);
};
