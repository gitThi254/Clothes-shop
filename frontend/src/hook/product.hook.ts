import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  create,
  deleteProduct,
  getById,
  getProduct,
  update,
  updateImage,
} from "../api/product";
import toast from "react-hot-toast";
import { selectCategory } from "../api/category";
import { useNavigate } from "@tanstack/react-router";

export const useAddProduct = () => {
  return useMutation({
    mutationFn: create,
    onError: (error: any) => {
      toast.error("fail to create product");
      error.message = error?.response?.data;
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: update,
    onError: (error: any) => {
      toast.error("fail to update product");
      error.message = error?.response?.data;
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: updateImage,
    onError: () => {
      toast.success("Fail Create Image");
    },
  });
};
export const useProduct = (id: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ["products", id],
        queryFn: () => getById(id),
      },
      {
        queryKey: ["category", "select"],
        queryFn: selectCategory,
      },
    ],
  });
};
export const useProductImage = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getById(id),
  });
};
export const useProductClient = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
  });
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Delete product success");
    },
    onError: (error: any) => {
      toast.error("fail to product Update");
      error.message = error?.response?.data;
    },
  });
};
