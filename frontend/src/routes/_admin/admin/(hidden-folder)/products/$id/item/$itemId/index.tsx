import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { ProductItem } from "../../../../../../../../table/columns/productItemColumns";
import {
  useProductItem,
  useUpdateProductItem,
} from "../../../../../../../../hook/product.item.hook";

export const Route = createFileRoute(
  "/_admin/admin/(hidden-folder)/products/$id/item/$itemId/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { id, itemId } = Route.useParams();
  const { data, isPending } = useProductItem({ id, itemId });
  return data && !isPending ? (
    <>
      <UpdateProductDialog data={data} />
    </>
  ) : (
    <></>
  );
}

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

export function UpdateProductDialog({ data }: { data: ProductItem }) {
  const form = useForm<ProductItem>({
    defaultValues: data,
    resolver: yupResolver(yupSchema),
  });
  const { id, itemId } = Route.useParams();
  const { register, handleSubmit, formState } = form;
  const { mutate, isPending } = useUpdateProductItem({ id, itemId });
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/products/$id/item", params: { id: id } });
    }
  }, [open]);
  const onSubmit = (data: ProductItem) => {
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
                  Size
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.size?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. <8.8oz | 250g"
                  {...register("size")}
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
                  Color
                  <span className="text-red-400 font-semibold ml-1">
                    {errors.color?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  type="color"
                  placeholder="eg. <8.8oz | 250g"
                  {...register("color")}
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
