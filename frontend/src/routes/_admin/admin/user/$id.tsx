import * as React from "react";
import * as Yup from "yup";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUser, useUpdateUser } from "../../../../hook/user.hook";
import { User } from "../../../../table/columns/userColumns";

export const Route = createFileRoute("/_admin/admin/user/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data, isPending } = useGetUser(id);

  return data && !isPending ? (
    <>
      <UpdateUserDialog data={data} />
    </>
  ) : (
    <></>
  );
}

const yupSchema = Yup.object({
  id: Yup.string().required("* is required"),
  username: Yup.string().required("* is required"),
  firstName: Yup.string().required("* is required"),
  lastName: Yup.string().required("* is required"),
  email: Yup.string().email("Invalid email").required("* is required"),
  phone: Yup.string().required("* is required"),
  password: Yup.string().required("* is required"),
  role: Yup.string().required("* is required"),
});
export function UpdateUserDialog({ data }: { data: User }) {
  const form = useForm<User>({
    defaultValues: data,
    resolver: yupResolver(yupSchema),
  });
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const { mutate, isPending } = useUpdateUser();
  React.useEffect(() => {
    if (!open) {
      navigate({ to: "/admin/user" });
    }
  }, [open]);
  const onSubmit = (data: User) => {
    mutate(data, {
      onSuccess: () => {
        navigate({ to: "/admin/user" });
      },
    });
  };
  console.log(watch());
  return (
    <>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Form User
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Create New Customer
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
                  First Name
                  <span className="text-red-500">
                    {errors.firstName?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. John"
                  {...register("firstName")}
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
                  Last Name
                  <span className="text-red-500">
                    {errors.lastName?.message}
                  </span>
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  placeholder="eg. Herri"
                  {...register("lastName")}
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
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Email
                <span className="text-red-500">{errors.email?.message}</span>
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. example@gmail.com"
                {...register("email")}
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
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Username
                <span className="text-red-500">{errors.username?.message}</span>
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. user01"
                {...register("username")}
                className="placeholder:opacity-100 focus:!border-t-gray-900 disabled"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
                disabled
              />
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Role
                <span className="text-red-500">{errors.role?.message}</span>
              </Typography>
              <select
                className="p-2 w-full border border-black rounded-md"
                {...register("role")}
              >
                <option value="USER" selected>
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Phone Number
                <span className="text-red-500">{errors.phone?.message}</span>
              </Typography>
              <Input
                type="text"
                color="gray"
                size="lg"
                placeholder="eg. +84 0123456789"
                {...register("phone")}
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
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Password
                <span className="text-red-500">{errors.password?.message}</span>
              </Typography>
              <Input
                type="password"
                color="gray"
                size="lg"
                placeholder="eg. password"
                {...register("password")}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              className="ml-auto"
              color="green"
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
