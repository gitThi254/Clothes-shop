import * as React from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { ShippingHttpRes } from "../../../api/shipping.api";
import { Cart } from "../../../api/cart";
import { PaginatedData } from "../../../api/types";
import { useFormContext } from "react-hook-form";
import { CartHttpreq } from "../cart";
import { useAddresses } from "../../../hook/address.hook";
import { AddressHttpRes } from "../../../api/address";
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import BtnAddress from "../../../components/button/BtnAddress";
import { register } from "../../../api/auth";

export const Route = createFileRoute("/_authentication/cart/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { authentication } = Route.useRouteContext();
  const form = useFormContext<CartHttpreq>();
  const { watch, register } = form;
  const [shipping, setShipping] = React.useState<ShippingHttpRes[]>(
    queryClient.getQueryData(["shipping"]) as ShippingHttpRes[]
  );
  const [cart, setCart] = React.useState<Cart[]>(
    (queryClient.getQueryData(["cart"]) as PaginatedData<Cart>).content.filter(
      (item) => watch("cartItemIds").includes(item.id ?? "")
    )
  );
  const { data, isPending } = useAddresses();

  const sum = React.useMemo(() => {
    const cartItemIds = watch("cartItemIds");
    if (!cart || !cartItemIds) return 0; // Handle empty data or cartItemIds

    return cart.reduce(
      (total, item) => total + (item.productItem?.price ?? 0) * item.qty,
      0
    );
  }, [watch("cartItemIds").filter((t) => t.toString() !== "false")]);
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div className="bg-gradient-to-r from-blue-gray-900 via-blue-gray-700 to-blue-gray-900 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div className="relative h-full">
            <div className="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div className="space-y-4">
                {cart ? (
                  <>
                    {cart.map((item) => (
                      <div className="flex items-start gap-4" key={item.id}>
                        <div className="w-32 h-30 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-blue-gray-400 rounded-md">
                          <img
                            src={item.productItem?.photoUrl}
                            className="w-full object-contain"
                          />
                        </div>
                        <div className="w-full">
                          <h3 className="text-base text-white">
                            {item.productName}
                          </h3>
                          <ul className="text-xs text-blue-gray-300 space-y-2 mt-2">
                            <li className="flex flex-wrap gap-4">
                              Size{" "}
                              <span className="ml-auto">
                                {item.productItem?.size}
                              </span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Color{" "}
                              <span
                                className="ml-auto w-4 h-4 rounded-md shadow-3"
                                style={{
                                  backgroundColor: item.productItem?.color,
                                }}
                              ></span>
                            </li>

                            <li className="flex flex-wrap gap-4">
                              Quantity{" "}
                              <span className="ml-auto">
                                {item.qty} X ${item.productItem?.price}
                              </span>
                            </li>
                            <li className="flex flex-wrap gap-4">
                              Total Price{" "}
                              <span className="ml-auto">
                                ${item.qty * (item.productItem?.price ?? 0)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="md:absolute md:left-0 md:bottom-0 bg-blue-gray-800 w-full p-4">
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                SubTotal <span className="ml-auto">$ {sum.toFixed(2)}</span>
              </h4>
              <h4 className="flex flex-wrap gap-4 text-base text-white">
                Shipping{" "}
                <span className="ml-auto">
                  $
                  {(
                    shipping.find(
                      (item) => item.id === watch("shippingMethodId")
                    )?.price ?? 0
                  ).toFixed(2)}
                </span>
              </h4>
              <hr className="text-white my-2" />
              <h4 className="flex flex-wrap gap-4 text-base text-white">
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
              </h4>
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 className="text-2xl font-bold text-blue-gray-800">
            Complete your order
          </h2>
          <div className="mt-8">
            <div>
              <h3 className="text-base text-blue-gray-800 mb-4">
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={authentication.isUser()?.firstName}
                    disabled={true}
                    className="px-4 py-3 bg-blue-gray-100/50 focus:bg-transparent text-blue-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={authentication.isUser()?.lastName}
                    disabled={true}
                    className="px-4 py-3 bg-blue-gray-100/50 focus:bg-transparent text-blue-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={authentication.isUser()?.email}
                    disabled={true}
                    className="px-4 py-3 bg-blue-gray-100/50 focus:bg-transparent text-blue-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Phone No."
                    value={authentication.isUser()?.phone}
                    disabled={true}
                    className="px-4 py-3 bg-blue-gray-100/50 focus:bg-transparent text-blue-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-base text-blue-gray-800 mb-4">
                  Shipping Address
                </h3>
                <Link to="/cart/checkout/create" className="btn btn-success">
                  Add Address
                </Link>
              </div>

              <Outlet />
              <Card className="w-full shadow-3">
                <List>
                  {data && !isPending ? (
                    data.content.map((item) => (
                      <ListItem
                        ripple={false}
                        className="py-1 pr-1 pl-4"
                        key={item.id}
                      >
                        <input
                          type="radio"
                          value={item.id}
                          {...register("addressId")}
                          className="radio mr-4"
                        />
                        <span>{item.diaChi}</span> - <span>{item.xa}</span> -
                        <span>{item.quan}</span> - <span>{item.tinh}</span>
                        <ListItemSuffix className="flex gap-3">
                          <Link
                            to="/cart/checkout/$id"
                            params={{ id: item.id }}
                          >
                            <Button color="yellow">Edit</Button>
                          </Link>

                          <BtnAddress id={item.id} />
                        </ListItemSuffix>
                      </ListItem>
                    ))
                  ) : (
                    <></>
                  )}
                </List>
              </Card>

              <div className="flex gap-4 max-md:flex-col mt-8">
                <Link
                  to="/cart"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-transparent hover:bg-blue-gray-100/50 border border-blue-gray-300 text-blue-gray-800 max-md:order-1"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
