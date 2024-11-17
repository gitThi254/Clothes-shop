import { createFileRoute } from "@tanstack/react-router";
import Profile from "../../../components/Profile";

export const Route = createFileRoute("/_authentication/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Profile />
    </>
  );
}
