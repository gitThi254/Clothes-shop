import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create, deleteUser, getById, update } from "../api/user";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Create User success");
    },
  });
};
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Delete user success");
    },
    onError: (error: any) => {
      toast.error("fail to user Delete");
      error.message = error?.response?.data;
    },
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getById(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Update user success");
    },
    onError: (error: any) => {
      toast.error("fail to user Update");
      error.message = error?.response?.data;
    },
  });
};
