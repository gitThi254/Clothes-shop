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
import {
  useAddCategory,
  useCategory,
  useUpdateCategory,
} from "../../../../hook/category.hook";
import { CategoryHttpReq } from "./create";
import { Category } from "../../../../table/columns/categoryColumns";
export const Route = createFileRoute("/_admin/admin/category/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending } = useCategory(id);
  return data && !isPending ? (
    <>
      <UpdateProductDialog data={data} />
    </>
  ) : (
    <></>
  );
}

const yupSchema = yup.object({
  id: yup.string().required("Id is required"),

  categoryName: yup.string().nullable().required("Category Name is required"),
});

export function UpdateProductDialog({ data }: { data: Category }) {
  const form = useForm<Category>({
    defaultValues: data,
    resolver: yupResolver(yupSchema),
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const { mutate, isPending } = useUpdateCategory();
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/category" });
    }
  }, [open]);
  const onSubmit = (data: Category) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
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
              Update category
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
              {isPending ? "Loading..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
