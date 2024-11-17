import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { DefaultPagination } from "../pagination/paginationProduct";
import { PaginatedData } from "../../api/types";
import { Product } from "../../table/columns/productColumns";
import { Route } from "../../routes/products";
import { useFilters } from "../../hook/useFilters";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function ProductListCard({ item }: { item: Product }) {
  return (
    <Card
      shadow={false}
      className="border rounded-none border-bodydark2 shadow-3 group/item m-0"
    >
      <CardBody className="px-0 pt-0 pb-6 m-0 flex flex-col items-center">
        <div className="w-full bg-transparent">
          <Link
            to="/products/$id"
            params={{ id: item.id }}
            className="relative"
          >
            <img
              src={item.photoUrl}
              alt={item.name}
              className="w-full h-[400px] object-cover"
            />

            <div className="absolute w-full inset-0 h-full bg-blue-gray-900/30 z-99 grid place-content-center invisible group-hover/item:visible">
              <Typography
                variant="h5"
                className="border border-white text-white border-spacing-2 px-7 py-2 hover:bg-white hover:text-black"
              >
                View
              </Typography>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1 justify-between mt-4">
          <Typography
            className="mb-3 mt-2 font-satoshi text-blue-gray-700/95"
            color="blue-gray"
            variant="h6"
          >
            {item.name.toUpperCase()}
          </Typography>
          <Typography variant="h6" className="text-blue-gray-900 font-bold">
            $ {item.min}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}

export function ProductListSection4({
  products,
}: {
  products: PaginatedData<Product>;
}) {
  const { filters, resetFilters, setFilters } = useFilters(Route.id);
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    setFilters({ keyword: search });
  };
  return (
    <section className="p-8 bg-white rounded-xl mr-2 w-full">
      <div className="mx-auto container w-full flex flex-col justify-between gap-6">
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search..."
            />
            <button
              className="absolute top-1 right-1 flex items-center rounded bg-blue-gray-900 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2 w-full">
          {products.content.map((item, index) => (
            <ProductListCard key={index} item={item} />
          ))}
        </div>
        <div className="">
          <DefaultPagination totalPages={products.totalPages} />
        </div>
      </div>
    </section>
  );
}

export default ProductListSection4;
