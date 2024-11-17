import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SelectReq } from "../../../../api/category";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import {
  useAddCategory,
  useSelectCategory,
} from "../../../../hook/category.hook";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAddProduct } from "../../../../hook/product.hook";
export const Route = createFileRoute("/_admin/admin/products/create")({
  component: RouteComponent,
});

export type ProducUpdatetHttpReq = {
  id?: string;
  name: string;
  description: string;
  categoryId: string;
  photoUrl?: string;
};
const yupSchema = yup.object({
  name: yup.string().required("* is required"),
  description: yup.string().required("* is required"),
  categoryId: yup.string().required("* is required"),
});

function RouteComponent() {
  const { data, isPending } = useSelectCategory();

  return data && !isPending ? (
    <>
      <AddProductDialog data={data} />
    </>
  ) : (
    <></>
  );
}

function AddProductDialog({ data }: { data: SelectReq[] }) {
  const form = useForm<ProducUpdatetHttpReq>({
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
    },
    resolver: yupResolver(yupSchema),
  });

  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, setError } = form;
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/products" });
    }
  }, [open]);
  const { mutate, isPending } = useAddProduct();

  const onSubmit = (data: ProducUpdatetHttpReq) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
        navigate({ to: "/admin/products" });
        toast.success("Create product success");
      },
      onError(error, variables, context) {
        setError("root", { type: "test", message: error.message.message });
      },
    });
  };

  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="px-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Form Product
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Create new Product
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
          <div className="text-red-500 text-title-sm">
            {errors.root?.message}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left flex gap-2 font-medium"
              >
                Name
                <span className="text-red-500">{errors.name?.message}</span>
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. White Shoes"
                {...register("name")}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left flex gap-2 font-medium"
                >
                  <span className="text-red-500">
                    {errors.categoryId?.message}
                  </span>
                </Typography>
                <select
                  className="p-2 w-full border border-black rounded-md"
                  {...register("categoryId")}
                >
                  <option disabled selected value={""}>
                    Select Category
                  </option>
                  {data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Description (Optional)
                <span className="text-red-500">
                  {errors.description?.message}
                </span>
              </Typography>
              <Textarea
                rows={5}
                {...register("description")}
                placeholder="eg. This is a white shoes with a comfortable sole."
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 text-left flex gap-2 font-medium"
            >
              <span className="text-red-500">{errors.name?.message}</span>
            </Typography>
          </DialogBody>

          <DialogFooter>
            <Button
              className="ml-auto"
              color="green"
              type="submit"
              loading={isPending}
            >
              {isPending ? "Loading" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
