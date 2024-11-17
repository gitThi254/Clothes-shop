import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShipping } from "../../hook/shipping.hook";
import { useCarts } from "../../hook/cart.hook";
import Loading from "../../components/Loading/Loading";
import { useAddresses, useCreateAddress } from "../../hook/address.hook";
import { useCreateShopOrder } from "../../hook/shopOrder.hook";
import toast from "react-hot-toast";

export const Route = createFileRoute("/_authentication/cart")({
  component: RouteComponent,
});
export type CartHttpreq = {
  cartItemIds: string[];
  shippingMethodId: string;
  addressId: string;
  totalPrice?: number;
};

const yupSchema = yup.object().shape({
  cartItemIds: yup
    .array()
    .of(yup.string().required("item is required"))
    .required("items is required"),
  shippingMethodId: yup.string().required("Shipping method is required"),
  addressId: yup.string().required("Address is required"),
});
function RouteComponent() {
  const { isPending } = useCarts();
  const { isPending: loading } = useShipping();

  const form = useForm<CartHttpreq>({
    defaultValues: {
      cartItemIds: [],
      shippingMethodId: "",
      addressId: "",
    },
    resolver: yupResolver(yupSchema),
  });
  const { handleSubmit } = form;
  const { mutate, isPending: pending } = useCreateShopOrder();
  const onSubmit = (data: CartHttpreq) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Create order Success");
      },
    });
  };
  if (isPending || loading) return <Loading />;
  return (
    <>
      <section className="bg-white py-8 container mx-auto antialiased dark:bg-gray-900 md:py-16">
        {pending ? "Processing..." : ""}
        <FormProvider {...form}>
          <form
            className="mx-auto max-w-screen-xl px-4 2xl:px-0"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Outlet />
          </form>
        </FormProvider>
      </section>
    </>
  );
}
