import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder, getById, update } from "../api/shopOrder.api";
import toast from "react-hot-toast";

export const useCreateShopOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onError: (error: any) => {
      toast.error("fail to create shopOrder");
      error.message = error?.response?.data;
    },
  });
};

export const useShopOrderDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin", "shop-order", id],
    queryFn: () => getById(id),
  });
};

export const useUpdateShopOrder = () => {
  return useMutation({
    mutationFn: update,
    onError: () => {
      toast.error("Failt to update order");
    },
  });
};
