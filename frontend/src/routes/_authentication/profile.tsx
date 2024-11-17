import * as React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SideBarProfile } from "../../components/navbar/SiderBarProfile";

export const Route = createFileRoute("/_authentication/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex gap-4 mx-4">
        <SideBarProfile />
        <section className="p-8 bg-white rounded-xl mr-2 w-full">
          <div className="mx-auto container w-full flex flex-col justify-between gap-6">
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
}
