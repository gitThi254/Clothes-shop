import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  create,
  deleteProductItem,
  getById,
  updateImageItem,
  updateItem,
} from "../api/product.item";
import toast from "react-hot-toast";
import { update } from "../api/category";

export const useCreateProductItem = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", id, "item"],
      });
      toast.success("Create Product Item success");
    },
    onError: () => {
      toast.error("Fail to create product item");
    },
  });
};

export const useUpdateProductItem = ({
  id,
  itemId,
}: {
  id: string;
  itemId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", id, "item"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", id, "item", itemId],
        exact: true,
      });
      toast.success("Update Product Item success");
    },
    onError: () => {
      toast.error("Fail to update product item");
    },
  });
};

export const useDeleteProductItem = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", id, "item"],
      });
      toast.success("Delete Product Item success");
    },
    onError: () => {
      toast.error("Fail to delete product item");
    },
  });
};

export const useProductItem = ({
  id,
  itemId,
}: {
  id: string;
  itemId: string;
}) => {
  return useQuery({
    queryKey: ["products", id, "item", itemId],
    queryFn: () => getById({ id, itemId }),
  });
};

export const useUploadImageItem = () => {
  return useMutation({
    mutationFn: updateImageItem,
    onError: () => {
      toast.success("Fail Create Image");
    },
  });
};
