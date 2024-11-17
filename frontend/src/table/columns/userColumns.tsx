import { Button } from "@material-tailwind/react";
import { Link } from "@tanstack/react-router";
import { ColumnDef, RowData } from "@tanstack/react-table";
import BtnProduct from "../../components/button/BtnCategory";
import BtnUser from "../../components/button/BtnUser";
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number" | undefined;
  }
}
export type User = {
  id: string;
  fullName?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export const USER_COLUMNS: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: () => <span className="font-bold text-md">ID</span>,
    meta: { filterKey: "id", filterVariant: "number" },
    cell: (info: any) => <span>{info.getValue().slice(0, 5) + "-***"}</span>,
  },
  {
    accessorKey: "fullName",
    header: () => <span className="font-bold text-md">Fullname</span>,
    meta: { filterKey: "fullName", filterVariant: "text" },
  },
  {
    accessorKey: "username",
    header: () => <span className="font-bold text-md">Username</span>,
    meta: { filterKey: "username", filterVariant: "text" },
  },
  {
    accessorKey: "email",
    header: () => <span className="font-bold text-md">Email</span>,
    meta: { filterKey: "email", filterVariant: "text" },
  },
  {
    accessorKey: "phone",
    header: () => <span className="font-bold text-md">Phone Number</span>,
    meta: { filterKey: "phone", filterVariant: "text" },
  },
  {
    accessorKey: "role",
    header: () => <span className="font-bold text-md">Role</span>,
    meta: { filterKey: "role", filterVariant: "text" },
  },
  {
    accessorKey: "password",
    header: () => <span className="font-bold text-md">Password</span>,
    meta: { filterKey: "password", filterVariant: "text" },
    cell: (info: any) => <span>{info.getValue()?.slice(0, 5) + "-***"}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "id",
    cell: (info) => (
      <>
        <div className="flex gap-4">
          <Link to="/admin/user/$id" params={{ id: info.getValue() as string }}>
            <Button color="amber">Edit</Button>
          </Link>
          <BtnUser id={info.getValue() as string} />
        </div>
      </>
    ),
    header: () => <span className="font-bold text-md">Action</span>,
    enableSorting: false,
  },
];
