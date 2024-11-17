import * as React from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  beforeLoad: ({ context }) => {
    const { isLogged, isUser } = context.authentication;
    if (!isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
    if (isUser()?.role !== "ADMIN") {
      throw redirect({
        to: "/",
      });
    }
  },
});
