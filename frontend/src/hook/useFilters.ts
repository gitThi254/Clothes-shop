import {
  getRouteApi,
  RegisteredRouter,
  RouteIds,
  useNavigate,
} from "@tanstack/react-router";
import { cleanEmptyParams } from "../utils/cleanEmptyParams";

type query = {
  keyword?: string;
};

export function useFilters<T extends RouteIds<RegisteredRouter["routeTree"]>>(
  routeId: T
) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const filters = routeApi.useSearch();
  const setFilters = (partialFilters: Partial<typeof filters & query>) => {
    return partialFilters?.keyword
      ? navigate({
          search: () => cleanEmptyParams({ ...partialFilters }),
        })
      : navigate({
          search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters }),
        });
  };

  const resetFilters = () => navigate({ search: {} });

  return { filters, setFilters, resetFilters };
}
