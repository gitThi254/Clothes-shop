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
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateAddress } from "../../../../hook/address.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/_authentication/profile/address/create")(
  {
    component: CreateAddressDialog,
  }
);
export type AddressHttpReq = {
  id?: string;
  diaChi: string;
  xa: string;
  quan: string;
  tinh: string;
};
const yupSchema = yup.object().shape({
  diaChi: yup.string().required("* is required"),
  xa: yup.string().required("* is required"),
  quan: yup.string().required("* is required"),
  tinh: yup.string().required("* is required"),
});

function CreateAddressDialog() {
  const [open, setOpen] = React.useState(true);
  const form = useForm<AddressHttpReq>({
    defaultValues: {
      diaChi: "",
      xa: "",
      quan: "",
      tinh: "",
    },
    resolver: yupResolver(yupSchema),
  });
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const navigate = useNavigate();
  const { mutate, isPending } = useCreateAddress();
  const handleOpen = () => setOpen(!open);
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/profile/address" });
    }
  }, [open]);
  const onSubmit = (data: AddressHttpReq) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["address"] });
        toast.success("Create Addres success");
        navigate({ to: "/profile/address" });
      },
    });
  };
  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Form Address
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Create New Address
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
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Dia chi
                <span className="text-red-500 ml-2">
                  {errors?.diaChi?.message}
                </span>
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. Dia Chi"
                {...register("diaChi")}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 text-left font-medium"
                >
                  Xa
                  <span className="text-red-500 ml-2">
                    {errors?.xa?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. Xa"
                  {...register("xa")}
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
                  Quan
                  <span className="text-red-500 ml-2">
                    {errors?.quan?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. Quan"
                  {...register("quan")}
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
                  Tinh
                  <span className="text-red-500 ml-2">
                    {errors?.tinh?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. Tinh"
                  {...register("tinh")}
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
            <Button
              color="green"
              className="ml-auto"
              type="submit"
              loading={isPending}
            >
              {isPending ? "Loading..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
}
