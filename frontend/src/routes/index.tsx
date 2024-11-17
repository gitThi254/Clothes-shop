import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import HeroMain from "../components/HeroMain";
import CarouseHero from "../components/CarouseHero";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CarouseHero />
      <HeroMain />
    </>
  );
}
