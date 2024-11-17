import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";

export function DefaultPagination({ totalPages }: { totalPages: number }) {
  const [active, setActive] = React.useState(0);

  const getItemProps = (index: any) =>
    ({
      variant: active === index ? "filled" : "text",
      className: "bg-black-2 text-white",
      onClick: () => setActive(index),
    }) as any;

  return (
    <div className="flex items-center gap-4 bg-white">
      <Link
        to="/products"
        className="flex items-center gap-2"
        search={(prev) => {
          setActive(prev.pageIndex);
          return {
            ...prev,
            pageIndex:
              prev.pageIndex - 1 === 0 ? undefined : prev.pageIndex - 1,
          };
        }}
        disabled={active === 0 || !active || totalPages === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Link>
      <div className="flex items-center gap-2">
        {Array(totalPages ?? 0)
          .fill(0)
          .map((_, index) => (
            <Link
              key={index}
              to="/products"
              search={(pre) =>
                index === 0
                  ? { ...pre, pageIndex: undefined }
                  : { ...pre, pageIndex: index }
              }
            >
              <IconButton {...getItemProps(index + 1)}>{index + 1}</IconButton>
            </Link>
          ))}
      </div>
      <Link
        to="/products"
        className="flex items-center gap-2"
        search={(prev) => {
          setActive(prev.pageIndex ? prev.pageIndex : 0);
          return {
            ...prev,
            pageIndex: prev.pageIndex ? prev.pageIndex : 0 + 1,
          };
        }}
        disabled={active === totalPages - 1 || totalPages === 0}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Link>
    </div>
  );
}
