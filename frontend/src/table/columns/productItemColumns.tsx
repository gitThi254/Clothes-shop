import { Button } from "@material-tailwind/react";
import { Link } from "@tanstack/react-router";
import { ColumnDef, RowData } from "@tanstack/react-table";
import NoImage from "./../../assets/noImage.png";

import BtnProductItem from "../../components/button/BtnProductItem";
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number" | undefined;
  }
}
export type ProductItem = {
  id?: string;
  qtyInStock: number;
  price: number;
  productId?: string;
  photoUrl?: any;
  size: string;
  color: string;
  sku: string;
};

export const PRODUCT_ITEM_COLUMNS: ColumnDef<ProductItem>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">ID</span>,
    meta: { filterKey: "id", filterVariant: "number" },
    cell: (info: any) => <span>{info.getValue().slice(0, 5) + "-***"}</span>,
  },
  {
    accessorKey: "sku",
    accessorFn: (row) => [row.id, row.sku, row.photoUrl, row.productId],
    header: () => <span className="font-bold text-md">SKU</span>,
    meta: { filterKey: "sku", filterVariant: "text" },
    cell: (info: any) => (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center overflow-hidden">
        <div className="h-12.5 w-15 rounded-md">
          <img src={`${info.getValue()[2] ?? NoImage}`} alt="Product" />
        </div>
        <Link
          to="/admin/products/$id/item/$itemId/upload"
          params={{ id: info.getValue()[3], itemId: info.getValue()[0] }}
        >
          <Button color="amber">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </Button>
        </Link>

        <p className="text-sm text-black dark:text-white">
          {info.getValue()[1]}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "qtyInStock",
    header: () => <span className="font-bold text-md">Qty in stock</span>,
    meta: { filterKey: "qtyInStock", filterVariant: "text" },
  },
  {
    accessorKey: "price",
    header: () => <span className="font-bold text-md">Price</span>,
    meta: { filterKey: "price", filterVariant: "number" },
  },
  {
    accessorKey: "size",
    header: () => <span className="font-bold text-md">Size</span>,
    meta: { filterKey: "size", filterVariant: "text" },
  },
  {
    accessorKey: "color",
    header: () => <span className="font-bold text-md">Color</span>,
    meta: { filterKey: "color", filterVariant: "text" },
    cell: (info) => (
      <span
        className={`w-8 h-8 inline-block rounded-md shadow-1 border`}
        style={{
          backgroundColor: info.getValue() as string,
        }}
      ></span>
    ),
  },
  {
    accessorKey: "action",
    accessorFn: (row) => [row.id, row.productId],
    cell: (info: any) => (
      <>
        <div className="flex gap-4">
          <Link
            to="/admin/products/$id/item/$itemId"
            params={{
              id: info.getValue()[1],
              itemId: info.getValue()[0] as string,
            }}
          >
            <Button color="amber">Edit</Button>
          </Link>
          <BtnProductItem id={info.getValue()[1]} itemId={info.getValue()[0]} />
        </div>
      </>
    ),
    header: () => <span className="font-bold text-md">Action</span>,
    enableSorting: false,
  },
];
