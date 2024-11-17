import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login, register, updateProfile } from "../api/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Create account success");
    },
    onError: (error: any) => {
      error.message = error?.response?.data;
      toast.error(error.message.message);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login success");
    },
    onError: (error: any) => {
      toast.error("Invalid Username or Password");
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
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
