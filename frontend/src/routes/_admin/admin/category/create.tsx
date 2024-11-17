import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as yup from "yup";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddCategory } from "../../../../hook/category.hook";

export const Route = createFileRoute("/_admin/admin/category/create")({
  component: AddProductDialog,
});

export type CategoryHttpReq = {
  id?: string;
  categoryName: string;
};

const yupSchema = yup.object({
  id: yup.string(),

  categoryName: yup.string().nullable().required("Category Name is required"),
});

export function AddProductDialog() {
  const form = useForm<CategoryHttpReq>({
    defaultValues: {
      id: "",
      categoryName: "",
    },
    resolver: yupResolver(yupSchema),
  });

  const { register, handleSubmit, formState, setError } = form;
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const { mutate, isPending } = useAddCategory();
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/category" });
    }
  }, [open]);
  const onSubmit = (data: CategoryHttpReq) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
      onError(error, variables, context) {
        setError("root", { type: "test", message: error.message.message });
      },
    });
  };
  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Category Form
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              create new category
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
          <DialogBody className="space-y-4 pb-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Category
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="Enter a category"
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                {...register("categoryName")}
              />
              <div className="text-title-sm text-red-500 font-medium mt-2">
                {errors.categoryName?.message}
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              className="ml-auto bg-success"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
