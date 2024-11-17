import * as React from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useAddresses } from "../../../hook/address.hook";
import { AddressHttpRes } from "../../../api/address";
import { PaginatedData } from "../../../api/types";
import BtnAddress from "../../../components/button/BtnAddress";

export const Route = createFileRoute("/_authentication/profile/address")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useAddresses();
  return data && !isPending ? (
    <>
      <ListAddress data={data} />
    </>
  ) : (
    <></>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ListAddress({ data }: { data: PaginatedData<AddressHttpRes> }) {
  return (
    <>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div>
              <Link to="/profile/address/create">
                <Button color="green">Add Address</Button>
              </Link>
            </div>
          </div>
          <Outlet />
          <Card className="w-full shadow-3">
            <List>
              {data.content.map((item) => (
                <ListItem
                  ripple={false}
                  className="py-1 pr-1 pl-4"
                  key={item.id}
                >
                  <span>{item.diaChi}</span> - <span>{item.xa}</span> -
                  <span>{item.quan}</span> - <span>{item.tinh}</span>
                  <ListItemSuffix className="flex gap-3">
                    <Link to="/profile/address/$id" params={{ id: item.id }}>
                      <Button color="yellow">Edit</Button>
                    </Link>

                    <BtnAddress id={item.id} />
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      </div>
    </>
  );
}
