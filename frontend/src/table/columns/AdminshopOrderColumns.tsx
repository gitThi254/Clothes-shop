import { Chip } from "@material-tailwind/react";
import { Link } from "@tanstack/react-router";
import { ColumnDef, RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number" | undefined;
  }
}
export type ShopOrder = {
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
  order_date: string;
  createdAt: string;
  updatedAt: string;
};

export const ADMIN_ORDER_COLUMNS: ColumnDef<ShopOrder>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">ID</span>,
    meta: { filterKey: "id", filterVariant: "number" },
    cell: (info: any) => <span>{info.getValue().slice(0, 5) + "-***"}</span>,
  },
  {
    accessorKey: "address",
    header: () => <span className="font-bold text-md">Address</span>,
    meta: { filterKey: "address", filterVariant: "text" },
  },
  {
    accessorKey: "username",
    header: () => <span className="font-bold text-md">Username</span>,
    meta: { filterKey: "username", filterVariant: "number" },
  },
  {
    accessorKey: "fullName",
    header: () => <span className="font-bold text-md">FullName</span>,
    meta: { filterKey: "fullName", filterVariant: "text" },
  },
  {
    accessorKey: "priceShipping",
    header: () => <span className="font-bold text-md">Shipping</span>,
    meta: { filterKey: "priceShipping", filterVariant: "text" },
  },
  {
    accessorKey: "shippingMethod",
    header: () => <span className="font-bold text-md">shipping Method</span>,
    meta: { filterKey: "shippingMethod", filterVariant: "text" },
  },
  {
    accessorKey: "finalTotal",
    header: () => <span className="font-bold text-md">Total Price</span>,
    meta: { filterKey: "finalTotal", filterVariant: "text" },
  },

  {
    accessorKey: "status",
    header: () => <span className="font-bold text-md">Status</span>,
    meta: { filterKey: "status", filterVariant: "text" },
    cell: (info) => <Chip color="cyan" value={info.getValue() as string} />,
  },
  {
    accessorKey: "order_date",
    header: () => <span className="font-bold text-md">Date</span>,
    meta: { filterKey: "order_date", filterVariant: "text" },
  },
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">Action</span>,
    cell: (info) => (
      <>
        <Link
          to="/admin/order/$id"
          params={{ id: info.getValue() as string }}
          className="btn btn-warning"
        >
          Edit
        </Link>
      </>
    ),
    enableSorting: false,
  },
];
