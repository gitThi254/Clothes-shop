import React, { useEffect, useState } from "react";
import { Cart } from "../../api/cart";
import BtnCart from "../button/BtnCart";
import { useForm, useFormContext } from "react-hook-form";
import { useDeletecart, useUpdateCart } from "../../hook/cart.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { CartHttpReq } from "../../routes/products/$id";
import { CartHttpreq } from "../../routes/_authentication/cart";
export type updateCartType = {
  id?: string;
  qty: number;
  productItemId: string;
};
const CartItem = ({ item }: { item: Cart }) => {
  const formContext = useFormContext<CartHttpreq>();
  const { register, formState } = formContext;
  const { errors } = formState;
  const form = useForm<updateCartType>({
    defaultValues: {
      id: item.id,
      qty: item.qty,
      productItemId: item.productItem?.id,
    },
  });
  const max = item.productItem?.qtyInStock ?? 0;
  const { getValues, setValue, watch } = form;
  const { mutate: mutateDelete, isPending: loading } = useDeletecart();
  const { mutate, isPending } = useUpdateCart();
  const queryClient = useQueryClient();
  useEffect(() => {
    const qty = watch("qty"); // Lấy giá trị của qty
    const timer =
      qty !== item.qty
        ? setTimeout(() => {
            mutate(watch(), {
              onSuccess: () => {
                toast.success("update cart success");
                queryClient.invalidateQueries({ queryKey: ["cart"] });
              },
            });
          }, 1000)
        : null; // 1000ms = 1 giây

    // Cleanup function để xóa timeout khi component unmount hoặc trước khi effect tiếp theo được gọi
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [watch("qty"), item.qty]);
  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <div className="col-span-2 flex items-start gap-4">
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            className="checkbox"
            value={item.id}
            {...register("cartItemIds")}
          />
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-blue-gray-100 p-2 rounded-md">
            <img
              src={item.productItem?.photoUrl}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-base font-bold text-blue-gray-800">
            {item.productName}
          </h3>
          <p className="text-xs font-semibold text-blue-gray-500 mt-0.5">
            Size: {item.productItem?.size}
          </p>
          <p className="text-xs font-semibold text-blue-gray-500 mt-0.5 flex items-end">
            Color:{" "}
            <span
              className="w-6 h-6 rounded-md inline-block shadow-3 border ml-2"
              style={{ backgroundColor: item.productItem?.color }}
            ></span>
          </p>
          <BtnCart id={item.id ?? ""} />
        </div>
      </div>

      <div className="ml-auto">
        <h4 className="text-lg max-sm:text-base font-bold text-blue-gray-800">
          {isPending || loading
            ? "Loading..."
            : ` $ ${(item.qty * (item.productItem?.price ?? 0)).toFixed(2)}`}
        </h4>
        <div>
          <div className="mt-6 flex items-center border border-blue-gray-300 text-blue-gray-800 text-xs outline-none bg-transparent rounded-md">
            <div
              className={`w-full h-full pr-1.5 pl-3 py-1.5 ${watch("qty") === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                if (getValues("qty") === 0) {
                  mutateDelete(item.id ?? "");
                }
                setValue(
                  "qty",
                  getValues("qty") === 0 ? 0 : getValues("qty") - 1
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2.5 fill-current"
                viewBox="0 0 124 124"
              >
                <path
                  d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            <span className="mx-3 font-bold">{watch("qty")}</span>
            <div
              onClick={() =>
                setValue(
                  "qty",
                  Number(getValues("qty")) === max
                    ? max
                    : Number(getValues("qty")) + 1
                )
              }
              className={`w-full h-full pr-3 pl-1.5  py-1.5 ${watch("qty") === max ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2.5 fill-current"
                viewBox="0 0 42 42"
              >
                <path
                  d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
