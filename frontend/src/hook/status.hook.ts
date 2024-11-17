import { useQuery } from "@tanstack/react-query";
import { getAllStatus } from "../api/orderStatus.api";

export const useStatus = () => {
  return useQuery({
    queryKey: ["order-status"],
    queryFn: getAllStatus,
  });
};
