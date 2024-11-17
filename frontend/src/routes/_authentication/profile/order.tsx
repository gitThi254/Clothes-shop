import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { fetchShopOrders, ShopOrderFilters } from "../../../api/shopOrder.api";
import { useFilters } from "../../../hook/useFilters";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import Table, {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../../../table/table";
import { sortByToState, stateToSortBy } from "../../../utils/tableSortMapper";
import { ORDER_COLUMNS } from "../../../table/columns/shopOrderColumns";
import { DebouncedInput } from "../../../components/debouncedInput";

export const Route = createFileRoute("/_authentication/profile/order")({
  validateSearch: () => ({}) as ShopOrderFilters,
  component: OrderRes,
});

function OrderRes() {
  const { filters, resetFilters, setFilters } = useFilters(Route.id);
  const result = useQueries({
    queries: [
      {
        queryKey: ["shop-order", filters],
        queryFn: () => fetchShopOrders(filters),
        placeholderData: keepPreviousData,
      },
    ],
  });
  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const sortingState = sortByToState(filters.sortBy);
  const columns = React.useMemo(() => ORDER_COLUMNS, []);
  return (
    <>
      <div className="flex flex-col gap-4 m-10 bg-white shadow-3 rounded-md py-8 px-4">
        <div className="flex gap-8">
          <div>
            <DebouncedInput
              onChange={(value) => {
                setFilters({
                  ["keyword" as keyof ShopOrderFilters]: value,
                } as Partial<ShopOrderFilters>);
              }}
              placeholder="Search..."
              type={"text"}
              value={filters["keyword"] ?? ""}
            />
          </div>
          <div>
            {/* {result[0].data ? (
            <>
              <div>
                <DebouncedSelect
                  onChange={(value) => {
                    setFilters({
                      ["categoryId" as keyof ProductFilters]: value,
                    } as Partial<ProductFilters>);
                  }}
                  placeholder="Search..."
                  type={"text"}
                  value={filters["categoryId"] ?? ""}
                  array={result[0].data ?? []}
                />
              </div>
            </>
          ) : null} */}
          </div>
        </div>
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
    </>
  );
}
