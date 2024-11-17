import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  deleteAddress,
  getAllAddress,
  getById,
  update,
} from "../api/address";
import toast from "react-hot-toast";

export const useCreateAddress = () => {
  return useMutation({
    mutationFn: create,
    onError: () => {
      toast.error("Failt to create address");
    },
  });
};

export const useAddresses = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: getAllAddress,
  });
};

export const useAddress = (id: string) => {
  return useQuery({
    queryKey: ["address", id],
    queryFn: () => getById(id),
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Delete address success");
    },
    onError: () => {
      toast.error("Failt to delete address");
    },
  });
};

export const useUpdateAddress = () => {
  return useMutation({
    mutationFn: update,
    onError: () => {
      toast.error("Failt to delete address");
    },
  });
};
