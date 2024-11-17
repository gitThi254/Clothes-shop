import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import * as yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateProductItem } from "../../../../../../../hook/product.item.hook";
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

const borderBlack = ["#E6E6FA", "#FFFFFF", "#FFFACD"];
export const Route = createFileRoute(
  "/_admin/admin/(hidden-folder)/products/$id/item/create"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddProductDialog />;
}

export type ProductItemHttpReq = {
  color: string;
  size: string;
  sku: string;
  qtyInStock: number;
  price: number;
};
const yupSchema = yup.object({
  color: yup.string().required("* is required"),
  size: yup.string().required("* is required"),
  sku: yup.string().required("* is required"),
  qtyInStock: yup
    .number()
    .min(1, "* min qty in stock > 0")
    .required("* is required"),
  price: yup.number().min(1, " * min price > 0").required("* is required"),
});

export function AddProductDialog() {
  const [value, setValue] = React.useState("");
  const form = useForm<ProductItemHttpReq>({
    defaultValues: {
      color: "",
      size: "",
      sku: "",
      qtyInStock: 0,
      price: 0,
    },
    resolver: yupResolver(yupSchema),
  });
  const { id } = Route.useParams();
  const { register, handleSubmit, formState } = form;
  const { mutate, isPending } = useCreateProductItem({ id });
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/products/$id/item", params: { id: id } });
    }
  }, [open]);
  const onSubmit = (data: ProductItemHttpReq) => {
    mutate(
      { id, data },
      {
        onSuccess: () => {
          navigate({ to: "/admin/products/$id/item", params: { id: id } });
        },
      }
    );
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Form Product Item
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Create new Product Item
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody className="space-y-4 pb-6">
            <div className="flex gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  Price
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.price?.message}
                  </span>
                </Typography>

                <Input
                  color="gray"
                  size="lg"
                  type="number"
                  placeholder="eg. 100$"
                  {...register("price")}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  Qty in Stock
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.qtyInStock?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  type="number"
                  placeholder="eg. 1000"
                  {...register("qtyInStock")}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  SKU
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.sku?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. White Shoes"
                  {...register("sku")}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  SIZE
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.size?.message}
                  </span>
                </Typography>
                <div className="relative">
                  <select
                    {...register("size")}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                  >
                    <option value="" selected disabled>
                      Select Size
                    </option>
                    {sizes.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                COLOR
                <span className="text-red-400 font-semibold ml-1">
                  {errors.color?.message}
                </span>
              </Typography>
              <div className="flex items-center flex-wrap gap-4">
                {colors.map((item: any) => (
                  <div key={item}>
                    <label
                      htmlFor={item}
                      className="w-8 h-8 rounded-md  opacity-0 cursor-pointer inline-block absolute z-9999"
                    ></label>
                    <IconButton
                      size="sm"
                      className={`relative z-10 ${borderBlack.includes(item) && "border border-black"} `}
                      style={{ backgroundColor: item }}
                    >
                      <input
                        type="radio"
                        hidden
                        id={item}
                        value={item}
                        {...register("color", {
                          onChange(event) {
                            setValue(event.target.value);
                          },
                        })}
                      />
                      {item === value ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`size-6 ${getBrightness(item) > 128 ? "text-black" : "text-white"}`}
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
          </DialogBody>
          <DialogFooter>
            <div className="flex gap-4">
              <Button className="ml-auto" color="red" onClick={handleOpen}>
                Close
              </Button>
              <Button
                className="ml-auto"
                color="green"
                type="submit"
                loading={isPending}
              >
                {isPending ? "Loading..." : "Save"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}

function getBrightness(hexColor: any) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}
