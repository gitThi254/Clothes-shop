import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  fetchProductItems,
  ProductItemFilters,
} from "../../../../../../api/product.item";
import { useFilters } from "../../../../../../hook/useFilters";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import Table, {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../../../../../../table/table";
import {
  sortByToState,
  stateToSortBy,
} from "../../../../../../utils/tableSortMapper";
import { PRODUCT_ITEM_COLUMNS } from "../../../../../../table/columns/productItemColumns";
import Title from "../../../../../../components/Title";
import { DebouncedInput } from "../../../../../../components/debouncedInput";

export const Route = createFileRoute(
  "/_admin/admin/(hidden-folder)/products/$id/item"
)({
  validateSearch: () => ({}) as ProductItemFilters,
  component: RouteComponent,
});

function RouteComponent() {
  const { filters, resetFilters, setFilters } = useFilters(Route.id);
  const { id } = Route.useParams();
  const result = useQueries({
    queries: [
      {
        queryKey: ["products", id, "item", filters],
        queryFn: () => fetchProductItems({ id, filtersAndPagination: filters }),
        placeholderData: keepPreviousData,
      },
    ],
  });
  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const sortingState = sortByToState(filters.sortBy);
  const columns = React.useMemo(() => PRODUCT_ITEM_COLUMNS, []);
  return (
    <>
      <Outlet />
      <Title bread="Product-item" name=" Product item ">
        <div className="flex gap-8 p-2">
          <div>
            <DebouncedInput
              onChange={(value) => {
                setFilters({
                  ["keyword" as keyof ProductItemFilters]: value,
                } as Partial<ProductItemFilters>);
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
