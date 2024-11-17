import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create, deleteCart, getAllCart, getById, update } from "../api/cart";
import toast from "react-hot-toast";

export const useCreatecart = () => {
  return useMutation({
    mutationFn: create,
    onError: () => {
      toast.error("Failt to create cart");
    },
  });
};

export const useCarts = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getAllCart,
  });
};

export const useCart = (id: string) => {
  return useQuery({
    queryKey: ["cart", id],
    queryFn: () => getById(id),
  });
};

export const useDeletecart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Delete cart success");
    },
    onError: () => {
      toast.error("Failt to cart cart");
    },
  });
};

export const useUpdateCart = () => {
  return useMutation({
    mutationFn: update,
    onError: () => {
      toast.error("Failt to cart cart");
    },
  });
};
