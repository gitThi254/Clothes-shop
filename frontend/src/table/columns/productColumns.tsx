import { Button } from "@material-tailwind/react";
import { Link } from "@tanstack/react-router";
import { ColumnDef, RowData } from "@tanstack/react-table";
import BtnProduct from "../../components/button/BtnCategory";
import NoImage from "./../../assets/noImage.png";
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number" | undefined;
  }
}
export type Product = {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  photoUrl: string;
  totalItems?: number;
  totalQty?: number;
  min?: number;
  max?: number;
};

export const PRODUCT_COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">ID</span>,
    meta: { filterKey: "id", filterVariant: "number" },
    cell: (info: any) => <span>{info.getValue().slice(0, 5) + "-***"}</span>,
  },
  {
    accessorKey: "name",
    accessorFn: (row) => [row.id, row.name, row.photoUrl],
    header: () => <span className="font-bold text-md">Name</span>,
    meta: { filterKey: "name", filterVariant: "text" },
    cell: (info: any) => (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center overflow-hidden">
        <div className="h-12.5 w-15 rounded-md">
          <img src={`${info.getValue()[2] ?? NoImage}`} alt="Product" />
        </div>
        <Link
          to="/admin/products/$id/upload"
          params={{ id: info.getValue()[0] }}
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
    accessorKey: "categoryName",
    header: () => <span className="font-bold text-md">Category</span>,
    meta: { filterKey: "categoryName", filterVariant: "text" },
  },
  {
    accessorKey: "description",
    header: () => <span className="font-bold text-md">Description</span>,
    meta: { filterKey: "description", filterVariant: "text" },
  },
  {
    accessorKey: "totalItems",
    header: () => <span className="font-bold text-md">Total items</span>,
    meta: { filterKey: "totalItems", filterVariant: "text" },
  },
  {
    accessorKey: "id",
    cell: (info) => (
      <>
        <div className="flex gap-4">
          <Link
            to="/admin/products/$id/item"
            params={{ id: info.getValue() as string }}
          >
            <Button color="blue">View</Button>
          </Link>
          <Link
            to="/admin/products/$id"
            params={{ id: info.getValue() as string }}
          >
            <Button color="amber">Edit</Button>
          </Link>
          <BtnProduct id={info.getValue() as string} />
        </div>
      </>
    ),
    header: () => <span className="font-bold text-md">Action</span>,
    enableSorting: false,
  },
];
