import { createFileRoute } from "@tanstack/react-router";
import { useCarts } from "../../../hook/cart.hook";
import { Cart } from "../../../api/cart";
import { PaginatedData } from "../../../api/types";
import Loading from "../../../components/Loading/Loading";

import CartItem from "../../../components/item/CartItem";
import CartSummary from "../../../components/cart/CartSummary";
import { CartHttpreq } from "../cart";
import { useFormContext } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
export const Route = createFileRoute("/_authentication/cart/")({
  component: RouteComponent,
});
function RouteComponent() {
  const queryClient = useQueryClient();
  const [data, setData] = useState<PaginatedData<Cart>>(
    queryClient.getQueryData(["cart"]) as PaginatedData<Cart>
  );
  return data ? (
    <>
      <ListCart data={data} />
    </>
  ) : (
    <></>
  );
}

function ListCart({ data }: { data: PaginatedData<Cart> }) {
  const formContext = useFormContext<CartHttpreq>();
  const { register, formState, setError, watch } = formContext;
  const { errors } = formState;
  return (
    <>
      <div className="font-sans mx-auto bg-white">
        <h1 className="text-3xl font-bold text-blue-gray-800 text-center">
          Shopping Cart
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="md:col-span-2 space-y-4">
            {data.content.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
            <hr className="border-blue-gray-300" />
            <span className="text-red-500 text-title-sm pt-2 inline-block">
              {errors.cartItemIds?.message}
            </span>
          </div>
          <CartSummary />
        </div>
      </div>
    </>
  );
}
