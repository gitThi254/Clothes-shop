import { PaginationState } from "@tanstack/react-table";
import * as v from "valibot";

type ItemFilters = v.InferOutput<typeof ItemFilters>;
export type PaginatedData<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
};
const ItemFilters = v.object({
  keyword: v.optional(v.string()),
});

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}` };
export type OrderParams = { order: "asc" | "desc" };
export type Filters<T> = Partial<
  T & PaginationParams & SortParams & OrderParams & ItemFilters
>;
