import { useFormContext } from "react-hook-form";
import { CartHttpreq } from "../../routes/_authentication/cart";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ShippingHttpRes } from "../../api/shipping.api";
import { PaginatedData } from "../../api/types";
import { Cart } from "../../api/cart";

const CartSummary = () => {
  const formContext = useFormContext<CartHttpreq>();
  const queryClient = useQueryClient();
  const [shipping, setShipping] = useState<ShippingHttpRes[]>(
    queryClient.getQueryData(["shipping"]) as ShippingHttpRes[]
  );
  const [cart, setCart] = useState<PaginatedData<Cart>>(
    queryClient.getQueryData(["cart"]) as PaginatedData<Cart>
  );
  const { register, watch, setError, formState, setValue } = formContext;
  const { errors } = formState;

  const navigate = useNavigate();

  const sum = useMemo(() => {
    const cartItemIds = watch("cartItemIds");
    if (!cart?.content || !cartItemIds) return 0; // Handle empty data or cartItemIds

    return cart.content
      .filter((item) => cartItemIds.includes(item.id ?? ""))
      .reduce(
        (total, item) => total + (item.productItem?.price ?? 0) * item.qty,
        0
      );
  }, [watch("cartItemIds").filter((t) => t.toString() !== "false")]);

  return (
    <div className="bg-blue-gray-100 rounded-md p-4 h-max">
      <h3 className="text-lg max-sm:text-base font-bold text-blue-gray-800 border-b border-blue-gray-300 pb-2">
        Order Summary
      </h3>

      <div className="mt-6">
        <div>
          <h3 className="text-base text-blue-gray-800  font-semibold mb-4">
            Enter Details{" "}
            <span className="text-error">
              {errors?.shippingMethodId?.message}
            </span>
          </h3>
          <div className="space-y-3">
            <div className="relative flex items-center">
              <select
                className="w-full px-3 py-2 border-none focus:border-blue-gray-300 target:border-none"
                {...register("shippingMethodId", {
                  disabled:
                    (watch("cartItemIds")?.length ?? 0 > 0) ? false : true,
                })}
              >
                <option disabled selected value="">
                  Select Shipping method
                </option>
                {shipping ? (
                  <>
                    {shipping.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} - ${item.price}
                      </option>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-4 h-4 absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <ul className="text-blue-gray-800 mt-6 space-y-3">
        <li className="flex flex-wrap gap-4 text-sm">
          Subtotal <span className="ml-auto font-bold">${sum.toFixed(2)}</span>
        </li>
        <li className="flex flex-wrap gap-4 text-sm">
          Shipping{" "}
          <span className="ml-auto font-bold">
            $
            {(
              shipping.find((item) => item.id === watch("shippingMethodId"))
                ?.price ?? 0
            ).toFixed(2)}
          </span>
        </li>
        <hr className="border-blue-gray-300" />
        <li className="flex flex-wrap gap-4 text-sm font-bold">
          Total{" "}
          <span className="ml-auto">
            $
            {sum > 0 && watch("shippingMethodId")
              ? (
                  sum +
                  (shipping.find(
                    (item) => item.id === watch("shippingMethodId")
                  )?.price ?? 0)
                ).toFixed(2)
              : 0}
          </span>
        </li>
      </ul>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-blue-gray-800 hover:bg-blue-gray-900 text-white rounded-md"
          onClick={() => {
            if (watch("cartItemIds") && watch("cartItemIds").length === 0)
              setError("cartItemIds", {
                type: "hello",
                message: "Please select product",
              });
            else {
              setError("cartItemIds", {
                type: "hello",
                message: "",
              });
            }
            if (
              watch("shippingMethodId") === undefined ||
              watch("shippingMethodId") === ""
            ) {
              setError("shippingMethodId", {
                type: "customer",
                message: " * is required",
              });
            }
            if (
              watch("cartItemIds").length > 0 &&
              watch("shippingMethodId") !== undefined &&
              watch("shippingMethodId") !== ""
            ) {
              setValue(
                "totalPrice",
                sum +
                  (shipping.find(
                    (item) => item.id === watch("shippingMethodId")
                  )?.price ?? 0)
              );
              navigate({ to: "/cart/checkout" });
            }
          }}
        >
          Checkout
        </button>
        <button
          type="button"
          className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-blue-gray-800 border border-blue-gray-300 rounded-md"
        >
          Continue Shopping{" "}
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
