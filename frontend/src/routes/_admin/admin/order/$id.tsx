import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Card, Typography } from "@material-tailwind/react";
import {
  useShopOrderDetail,
  useUpdateShopOrder,
} from "../../../../hook/shopOrder.hook";
import Loading from "../../../../components/Loading/Loading";
import { useStatus } from "../../../../hook/status.hook";
import { useForm } from "react-hook-form";
import { UpdateShopOrderType } from "../../../../api/shopOrder.api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Status } from "../../../../api/orderStatus.api";

const TABLE_HEAD = ["Product", "COLOR", "SIZE", "Price", "Qty", "Total"];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
    a: "Manager",
    b: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
    a: "Manager",
    b: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
    a: "Manager",
    b: "23/04/18",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
    a: "Manager",
    b: "23/04/18",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
    a: "Manager",
    b: "23/04/18",
  },
];

export interface ShopOrderDetailsType {
  id: string;
  statusId: string;
  status: string;
  address: string;
  shippingMethod: string;
  username: string;
  fullName: string;
  priceShipping: number;
  finalTotal: number;
  userId: string;
  orderLines: OrderLine[];
  order_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderLine {
  id: string;
  price: number;
  qty: number;
  productItem: ProductItem;
}

export interface ProductItem {
  id: string;
  qtyInStock: number;
  price: number;
  photoUrl: string;
  size: string;
  color: string;
  product: Product;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  minMaxItem: MinMaxItem;
  qtyInStock: number;
}

export interface MinMaxItem {
  min: number;
  max: number;
}

export const Route = createFileRoute("/_admin/admin/order/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending } = useShopOrderDetail(id);
  const { data: status, isPending: loading } = useStatus();

  if (isPending || loading) return <Loading />;
  return data && status ? (
    <>
      <ShopOrderDetails data={data} status={status} />
    </>
  ) : (
    <></>
  );
}

function ShopOrderDetails({
  data,
  status,
}: {
  data: ShopOrderDetailsType;
  status: Status[];
}) {
  const form = useForm<UpdateShopOrderType>({
    defaultValues: { id: data.id, orderStatusId: data.statusId },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate, isPending: loading } = useUpdateShopOrder();
  const queryClient = useQueryClient();
  const onSubmit = (data: UpdateShopOrderType) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["admin", "shop-order", data.id],
          exact: true,
        });
        toast.success("Update Order success");
      },
    });
  };
  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white min-h-screen shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="relative z-20 h-full mt-15 mx-20">
          <div>
            <Typography variant="h2" className="text-black-2">
              Order #{data.id}
            </Typography>
            <Typography variant="h4" className="text-blue-gray-700 font-light">
              Customer ID :{" "}
              <span className="text-light-blue-700">{data.userId}</span>
            </Typography>
          </div>
          <div className="w-full h-full  grid grid-cols-3">
            <div className="col-span-2 px-2">
              <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.orderLines.map((item, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={`${classes} flex gap-3 items-center`}>
                            <div className="w-18 h-18 p-1 rounded-md shadow-1 bg-blue-gray-200">
                              <img
                                src={item.productItem.photoUrl}
                                alt="image"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.productItem.product.name}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div
                              className="w-8 h-8 p-2 border rounded-md shadow-2"
                              style={{
                                backgroundColor: item.productItem.color,
                              }}
                            ></div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {item.productItem.size}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {item.productItem.price}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {item.qty}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              as="a"
                              href="#"
                              variant="small"
                              color="blue-gray"
                              className="font-medium"
                            >
                              {item.price * item.qty}
                            </Typography>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <hr className="text-blue-gray-500" />
                <div className="flex justify-between items-center my-4 mx-2">
                  <div>Items subtotal :</div>
                  <div>${data.finalTotal - data.priceShipping}</div>
                </div>
                <hr className="text-blue-gray-500" />
              </Card>
            </div>
            <div className="col-span-1 flex flex-col gap-2 mt-2 px-2">
              <Card className="h-full w-full px-4 py-4 flex flex-col gap-4">
                <Typography variant="h2" className="font-satoshi">
                  Summary
                </Typography>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-satoshi">
                    Items subtotal :
                  </Typography>{" "}
                  <div>${data.finalTotal - data.priceShipping}</div>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-satoshi">
                    Shipping :
                  </Typography>{" "}
                  <div className="text-red-500">${data.priceShipping}</div>
                </div>
                <hr className="text-blue-gray-500 my-1" />
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-satoshi">
                    Total :
                  </Typography>{" "}
                  <Typography variant="h5" className="font-satoshi">
                    ${data.finalTotal}
                  </Typography>{" "}
                </div>
              </Card>
              <Card>
                <form
                  className="h-full w-full flex flex-col gap-4 py-4 px-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography variant="h2" className="font-satoshi">
                    Order Status
                  </Typography>
                  <select
                    className="select select-info w-full"
                    {...register("orderStatusId")}
                  >
                    <option disabled selected>
                      Select Status
                    </option>
                    {status?.map((item) => (
                      <option value={item.id}>{item.status}</option>
                    ))}
                  </select>
                  <button
                    className="btn btn-success mt-2 mb-4"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Apply"}
                  </button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
