import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFilters } from "../../hook/useFilters";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/product";
import Loading from "../../components/Loading/Loading";
import { ProductSide } from "../../components/navbar/SideBarProduct";
import { PaginatedData } from "../../api/types";
import ProductListSection4 from "../../components/List/ListProduct";
import { Product } from "../../table/columns/productColumns";
import { selectCategory } from "../../api/category";

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { filters } = useFilters(Route.id);
  const { data, isPending } = useQuery({
    queryKey: ["category", "select"],
    queryFn: selectCategory,
  });
  const { data: products, isPending: loading } = useQuery({
    queryKey: ["products", { ...filters, pageSize: 8 }],
    queryFn: () => fetchProducts({ ...filters, pageSize: 8 }),
    placeholderData: keepPreviousData,
  });

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex gap-4 mx-4">
        <div>{data && !isPending && <ProductSide select={data} />}</div>
        {products && !loading ? <ProductList products={products} /> : <></>}
      </div>
    </>
  );
}

function ProductList({ products }: { products: PaginatedData<Product> }) {
  return (
    <>
      <ProductListSection4 products={products} />
    </>
  );
}
