import { Filters, PaginatedData } from "./types";
import qs from "qs";
import axios from "./axios";
import { User } from "../table/columns/userColumns";
import { UserHttpReq } from "../routes/_admin/admin/user/create";
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

export type UserFilters = Filters<User>;

export async function fetchUsers(
  filtersAndPagination: UserFilters
): Promise<PaginatedData<User>> {
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
    .get(`/admin/user${queryString ? `?${queryString}` : ""}`)
    .then((res) => {
      return res.data;
    });
  return data;
}

export const create = async (data: UserHttpReq) => {
  return axios.post("/admin/user", data);
};

export const deleteUser = async (id: string) => {
  return axios.delete(`/admin/user/${id}`);
};

export const getById = (id: string): Promise<User> => {
  return axios.get(`/admin/user/${id}`).then((res) => res.data);
};

export const update = (data: User): Promise<User> => {
  return axios.put(`/admin/user/${data.id}`, data).then((res) => res.data);
};
