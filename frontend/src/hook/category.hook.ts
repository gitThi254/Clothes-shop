import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  deleteCategory,
  getById,
  selectCategory,
  update,
} from "../api/category";
import toast from "react-hot-toast";

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("create category success");
    },
    onError: (error: any) => {
      toast.error("fail to create category");
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Update category success");
    },
    onError: (error: any) => {
      toast.error("fail to update Update");
      error.message = error?.response?.data;
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Delete category success");
    },
    onError: (error: any) => {
      toast.error("fail to Delete Update");
      error.message = error?.response?.data;
    },
  });
};
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getById(id),
  });
};

export const useSelectCategory = () => {
  return useQuery({
    queryKey: ["category", "select"],
    queryFn: selectCategory,
  });
};
