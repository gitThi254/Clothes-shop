import * as React from "react";
import {
  createFileRoute,
  Link,
  Router,
  useNavigate,
} from "@tanstack/react-router";
import noImage from "../../assets/noImage.png";
import {
  Button,
  Checkbox,
  IconButton,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { InputAmountButtons } from "../../components/input/InputAmountButtons";
import { useProductClient } from "../../hook/product.hook";
import Loading from "../../components/Loading/Loading";
import { Root } from "../../api/product";
import { FormProvider, useForm } from "react-hook-form";
import { useCreatecart } from "../../hook/cart.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export const Route = createFileRoute("/products/$id")({
  component: RouteComponent,
});
export type CartHttpReq = {
  id?: string;
  productItemId: string;
  qty: number;
};
function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending } = useProductClient(id);
  if (isPending) <Loading />;
  return data && !isPending ? <ProductDetails data={data} /> : <></>;
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  "#000000", // Đen (Black)
  "#808080", // Xám (Gray)
  "#36454F", // Màu than (Charcoal)
  "#C0C0C0", // Màu bạc (Silver)
  "#FFFFFF", // Trắng (White)

  "#000080", // Xanh navy (Navy Blue)
  "#0000FF", // Xanh dương (Blue)

  "#008080", // Xanh ngọc (Teal)
  "#008000", // Xanh lá (Green)
  "#556B2F", // Xanh rêu (Olive Green)

  "#FF0000", // Đỏ (Red)
  "#800020", // Đỏ đô (Burgundy)
  "#FFC0CB", // Hồng (Pink)

  "#FFFF00", // Vàng (Yellow)
  "#FFD700", // Màu vàng đồng (Gold)
  "#FFFACD", // Vàng nhạt (Pastel Yellow)

  "#FFA500", // Cam (Orange)
  "#D2691E", // Cam đất (Rust Orange)

  "#A52A2A", // Nâu (Brown)
  "#8B4513", // Nâu đất (Earthy Brown)
  "#F5DEB3", // Màu nude (Nude)

  "#800080", // Tím (Purple)
  "#E6E6FA", // Tím nhạt (Lavender)
];
type InfoProduct = {
  qtyInStock: number;
  price: number;
};
const borderBlack = ["#E6E6FA", "#FFFFFF", "#FFFACD"];

function ProductDetails({ data }: { data: Root }) {
  const navigate = useNavigate();
  const { authentication } = Route.useRouteContext();
  const form = useForm<CartHttpReq>({
    defaultValues: {
      productItemId: "",
      qty: 0,
    },
  });
  const { register, handleSubmit, formState, watch, setValue: setItem } = form;
  const [value, setValue] = React.useState("");
  const [isSize, setIsSize] = React.useState("");
  const [sizeOfColor, setSizeOfColor] = React.useState<string[]>();
  const [image, setImage] = React.useState(data.photoUrl);
  const [price, setPrice] = React.useState<InfoProduct>({
    qtyInStock: 0,
    price: 0,
  });
  React.useEffect(() => {
    const listSize = data.productItems
      .filter((item) => item.color === value)
      .map((item) => item.size);
    setSizeOfColor(listSize);
  }, [value]);
  React.useEffect(() => {
    const item = data.productItems.find(
      (item) => item.size === isSize && item.color === value
    );
    if (item) {
      setPrice({ price: item.price, qtyInStock: item.qtyInStock });
      setImage(item.photoUrl);
      setItem("productItemId", item.id);
    } else {
      setPrice({ price: 0, qtyInStock: 0 });
      setItem("productItemId", "");
    }
  }, [value, isSize]);

  const color = data.productItems
    .map((item) => item.color)
    .sort((a, b) => colors.indexOf(a) - colors.indexOf(b));
  const uniqueColors = [...new Set(color)];
  const size = data.productItems
    .map((item) => item.size)
    .sort((a, b) => sizes.indexOf(a) - sizes.indexOf(b));
  const uniqueSize = [...new Set(size)];
  React.useEffect(() => {
    if (image !== data.photoUrl) {
      const itemProduct = data.productItems.find(
        (item) => item.photoUrl === image
      );
      setValue(itemProduct?.color ?? "");
      setIsSize(itemProduct?.size ?? "");
    }
  }, [image]);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreatecart();
  const onSubmit = (data: CartHttpReq) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        toast.success("Add to Cart success");
      },
    });
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="container mx-auto px-40">
          <div className="mx-auto grid grid-cols-2 gap-6">
            <div>
              <img src={image} className="w-full"></img>
              <div className="grid grid-cols-5 gap-4 mt-4">
                {data.productItems ? (
                  data.productItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setImage(item.photoUrl)}
                      className="rounded-md"
                      style={{
                        border: item.photoUrl === image ? "3px solid red" : "",
                      }}
                    >
                      <img
                        src={item.photoUrl}
                        className="w-full object-scale-down cursor-pointer border border-primary"
                      />
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-medium uppercase mb-2">
                {data.name}
              </h2>
              <div className="flex items-center mb-4">
                <div className="flex gap-1 text-sm text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-blue-gray-600 ml-3">
                  (150 Reviews)
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-blue-gray-700 font-semibold space-x-2">
                  <span>Avilability: </span>
                  <span className="text-green-600">{data.totalItems}</span>
                </p>
                <p className="space-x-2">
                  <span className="text-blue-gray-800 font-semibold">
                    Brand:{" "}
                  </span>
                  <span className="text-blue-gray-600">Apex</span>
                </p>
                <p className="space-x-2">
                  <span className="text-blue-gray-800 font-semibold">
                    Category:{" "}
                  </span>
                  <span className="text-blue-gray-600">
                    {data.categoryName}
                  </span>
                </p>
                <p className="space-x-2">
                  <span className="text-blue-gray-800 font-semibold">
                    SKU:{" "}
                  </span>
                  <span className="text-blue-gray-600">BE45VGRT</span>
                </p>
              </div>
              <div className="flex items-baseline mb-1 space-x-2 font-satoshi mt-4">
                <p className="text-xl text-red-600 font-semibold">
                  $ {price.price.toFixed(2)}
                </p>
                <p className="text-xl text-blue-gray-700 line-through">
                  $55.00
                </p>
              </div>
              <p className="mt-4 text-blue-gray-700 line-clamp-3">
                {data.description}
              </p>
              <div className="mt-4">
                <h3 className="text-xl text-blue-gray-800 uppercase font-medium">
                  Color
                </h3>
                <div className="flex items-center gap-4">
                  {uniqueColors.map((item: any) => (
                    <div key={item}>
                      <label
                        htmlFor={item}
                        className="w-8 h-8 rounded-md  opacity-0 cursor-pointer inline-block absolute z-9999 disabled"
                      ></label>
                      <IconButton
                        size="sm"
                        className={`relative z-10 ${borderBlack.includes(item) ? "border border-black" : ""}`}
                        style={{ backgroundColor: item }}
                      >
                        <input
                          type="radio"
                          hidden
                          id={item}
                          value={item}
                          onChange={(e) => setValue(e.target.value)}
                          name="color"
                        />
                        {item === value ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`size-6 ${borderBlack.includes(item) ? "text-black" : "text-white"}`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <></>
                        )}
                      </IconButton>
                    </div>
                  ))}
                </div>
              </div>
              <div></div>
              <div className="mt-4">
                <h3 className="text-xl text-blue-gray-800 uppercase font-medium">
                  Size
                </h3>
                <div className="flex gap-3 items-center">
                  {uniqueSize.map((item) => (
                    <label
                      key={item}
                      htmlFor={item}
                      className={`w-12 h-9 flex items-center  ${isSize === item && sizeOfColor?.includes(item) ? "text-cyan-900 border-cyan-700 bg-cyan-400/40 cursor-pointer" : sizeOfColor?.includes(item) ? "text-cyan-300 border-cyan-300 bg-cyan-400/20 cursor-pointer" : "text-blue-gray-900 border-blue-gray-700/90 bg-blue-gray-400/20 cursor-not-allowed"} justify-center border rounded-md   z-9999`}
                    >
                      <Typography>{item}</Typography>
                      <input
                        type="radio"
                        hidden
                        id={item}
                        name="size"
                        value={item}
                        onChange={(e) => setIsSize(e.target.value)}
                        disabled={!sizeOfColor?.includes(item)}
                      />
                    </label>
                  ))}
                </div>
              </div>
              {price.qtyInStock ? (
                <div className="mt-4">
                  <div className="flex gap-2">
                    <h3 className="text-xl text-blue-gray-800 uppercase font-medium">
                      Quantity
                    </h3>
                    <span className="text-red-400 text-title-sm">
                      qty in stock: {price.qtyInStock}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <InputAmountButtons max={price.qtyInStock} />
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="flex gap-3 border-b border-blue-gray-300 pb-5 mt-6">
                {authentication.isLogged() ? (
                  <Button
                    type="submit"
                    className="bg-red-400 border border-red-400 text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-red-400 transition"
                    loading={isPending}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {isPending ? "Loading..." : "Add to cart"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="bg-red-400 border border-red-400 text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-red-400 transition"
                    loading={isPending}
                    onClick={() => navigate({ to: "/login" })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                    {isPending ? "Loading..." : "Add to cart"}
                  </Button>
                )}

                <Link
                  href="#"
                  className="bg-transparent border border-red-400 text-red-400 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-red-400 hover:text-white transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
}
