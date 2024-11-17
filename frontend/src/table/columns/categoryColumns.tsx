import { ColumnDef, RowData } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { Button } from "@material-tailwind/react";
import BtnCategory from "../../components/button/BtnCategory";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number" | undefined;
  }
}

export type Category = {
  id: string;
  categoryName: string;
};

export const CATEGORY_COLUMNS: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">ID</span>,
    meta: { filterKey: "id", filterVariant: "number" },
    cell: (info: any) => <span>{info.getValue().slice(0, 5) + "-***"}</span>,
  },
  {
    accessorKey: "categoryName",
    header: () => <span className="font-bold text-md">Category name</span>,
    meta: { filterKey: "categoryName", filterVariant: "text" },
  },
  {
    accessorKey: "id",
    cell: (info) => (
      <>
        <div className="flex gap-4">
          <Link
            to="/admin/category/$id"
            params={{ id: info.getValue() as string }}
            className="btn btn-info"
          >
            View
          </Link>
          <BtnCategory id={info.getValue() as string} />
        </div>
      </>
    ),
    header: () => <span className="font-bold text-md">Action</span>,
    enableSorting: false,
  },
];
