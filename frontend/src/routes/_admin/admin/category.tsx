import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Title from "../../../components/Title";
import { CATEGORY_COLUMNS } from "../../../table/columns/categoryColumns";
import { sortByToState, stateToSortBy } from "../../../utils/tableSortMapper";
import Table, {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../../../table/table";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { DebouncedInput } from "../../../components/debouncedInput";
import { useFilters } from "../../../hook/useFilters";
import { CategoryFilters, fetchCategories } from "../../../api/category";

export const Route = createFileRoute("/_admin/admin/category")({
  validateSearch: () => ({}) as CategoryFilters,
  component: RouteComponent,
});

function RouteComponent() {
  const { filters, resetFilters, setFilters } = useFilters(Route.id);
  const result = useQueries({
    queries: [
      {
        queryKey: ["category", filters],
        queryFn: () => fetchCategories(filters),
        placeholderData: keepPreviousData,
      },
    ],
  });
  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const sortingState = sortByToState(filters.sortBy);
  const columns = React.useMemo(() => CATEGORY_COLUMNS, []);
  return (
    <>
      <Outlet />
      <Title bread="Category" name="Category">
        <div className="flex gap-8 p-2">
          <div>
            <DebouncedInput
              onChange={(value) => {
                setFilters({
                  ["keyword" as keyof CategoryFilters]: value,
                } as Partial<CategoryFilters>);
              }}
              placeholder="Search..."
              type={"text"}
              value={filters["keyword"] ?? ""}
            />
          </div>
          <div></div>
        </div>
        <div>
          <Table
            data={
              !result[0].isPlaceholderData || result[0].isPending
                ? result[0].data
                  ? result[0].data.content
                  : []
                : []
            }
            columns={columns}
            pagination={paginationState}
            paginationOptions={{
              onPaginationChange: (pagination) => {
                setFilters(
                  typeof pagination === "function"
                    ? pagination(paginationState)
                    : pagination
                );
              },
              rowCount: result[0].data?.totalElements,
            }}
            filters={filters}
            onFilterChange={(filter) => {
              return setFilters(filter);
            }}
            sorting={sortingState}
            onSortingChange={(updaterOrValue) => {
              const newSortingState =
                typeof updaterOrValue === "function"
                  ? updaterOrValue(sortingState)
                  : updaterOrValue;
              return setFilters({ sortBy: stateToSortBy(newSortingState) });
            }}
          />
        </div>
      </Title>
    </>
  );
}
