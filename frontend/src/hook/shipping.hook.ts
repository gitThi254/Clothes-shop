import { useQuery } from "@tanstack/react-query";
import { getShippping } from "../api/shipping.api";

export const useShipping = () => {
  return useQuery({
    queryKey: ["shipping"],
    queryFn: getShippping,
  });
};
