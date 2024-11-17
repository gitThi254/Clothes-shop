import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

// @icons
import { CpuChipIcon } from "@heroicons/react/24/solid";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useRegister } from "../../hook/auth.hook";

export const Route = createFileRoute("/_notAuth/register")({
  component: Register,
});
export const yupSchema = yup.object().shape({
  firstName: yup.string().required(" * is required"),
  lastName: yup.string().required(" * is required"),
  username: yup.string().required(" * is required"),
  password: yup
    .string()
    .required(" * is required")
    .min(4, "Password > 4 characters"),
  // Adjust min length as needed
  phone: yup
    .string()
    .required(" * is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  email: yup.string().email("Invalid Eemail").required(" * is required"),
});
export type UserHttpReq = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
};
function Register() {
  const navigate = useNavigate();
  const form = useForm<UserHttpReq>({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      phone: "",
    },
    mode: "onBlur",
    resolver: yupResolver(yupSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate, isPending } = useRegister();
  const onSubmit = (data: UserHttpReq) => {
    mutate(
      { data },
      {
        onSuccess: () => {
          navigate({
            to: "/login",
          });
        },
      }
    );
  };

  return (
    <>
      <section className="px-8 my-8">
        <Link
          to="/"
          className="link link-neutral text-title-lg flex items-center"
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          <span className="ml-2">Go Home</span>
        </Link>
        <div className="container mx-auto h-screen grid place-items-center">
          <Card
            shadow={false}
            className="md:px-18 md:py-10 py-8 border border-blue-gray-200 shadow-3"
          >
            <CardHeader shadow={false} floated={false} className="text-center">
              <Typography
                variant="h1"
                color="blue-gray"
                className="mb-4 !text-3xl lg:text-4xl"
              >
                Retister Form
              </Typography>
            </CardHeader>
            <CardBody>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 md:mt-2"
              >
                <div className="flex gap-4">
                  <div>
                    <label htmlFor="firstName">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium mb-2"
                      >
                        First Name
                        <span className="text-red-400 ml-2">
                          {errors.firstName?.message}
                        </span>
                      </Typography>
                    </label>
                    <Input
                      id="email"
                      color="gray"
                      size="lg"
                      type="text"
                      {...register("firstName")}
                      placeholder="eg. John"
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium mb-2"
                      >
                        Last Name
                        <span className="text-red-400 ml-2">
                          {errors.lastName?.message}
                        </span>
                      </Typography>
                    </label>
                    <Input
                      id="lastName"
                      color="gray"
                      size="lg"
                      type="text"
                      {...register("lastName")}
                      placeholder="eg. Harri"
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <label htmlFor="email">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium mb-2"
                      >
                        Email
                        <span className="text-red-400 ml-2">
                          {errors.email?.message}
                        </span>
                      </Typography>
                    </label>
                    <Input
                      id="email"
                      color="gray"
                      size="lg"
                      {...register("email")}
                      placeholder="name@mail.com"
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="block font-medium mb-2"
                      >
                        Phone Number
                        <span className="text-red-400 ml-2">
                          {errors.phone?.message}
                        </span>
                      </Typography>
                    </label>
                    <Input
                      id="phone"
                      color="gray"
                      size="lg"
                      type="text"
                      {...register("phone")}
                      placeholder="+84 123456789"
                      className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                      labelProps={{
                        className: "hidden",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="username">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium mb-2"
                    >
                      Username
                      <span className="text-red-400 ml-2">
                        {errors.username?.message}
                      </span>
                    </Typography>
                  </label>
                  <Input
                    id="username"
                    color="gray"
                    size="lg"
                    type="text"
                    {...register("username")}
                    placeholder="user01"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="password">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium mb-2"
                    >
                      Password
                      <span className="text-red-400 ml-2">
                        {errors.password?.message}
                      </span>
                    </Typography>
                  </label>
                  <Input
                    id="password"
                    color="gray"
                    size="lg"
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>

                <Button
                  size="lg"
                  color="gray"
                  className="bg-black-2"
                  fullWidth
                  type="submit"
                  loading={isPending}
                >
                  {isPending ? "Loading..." : "Register"}
                </Button>
                <div className="text-center">
                  <p>
                    Already account?{" "}
                    <Link to="/login" className="text-primary">
                      Login
                    </Link>
                  </p>
                </div>
                <Button
                  variant="outlined"
                  size="lg"
                  className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                  fullWidth
                >
                  <img
                    src={`https://www.material-tailwind.com/logos/logo-google.png`}
                    alt="google"
                    className="h-6 w-6"
                  />{" "}
                  sign in with google
                </Button>
                <Button
                  variant="outlined"
                  size="lg"
                  className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
                  fullWidth
                >
                  <CpuChipIcon className="h-6 w-6" />
                  Wallet Authentication
                </Button>
                <Typography
                  variant="small"
                  className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                >
                  Upon signing in, you consent to abide by our{" "}
                  <a href="#" className="text-gray-900">
                    Terms of Service
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-gray-900">
                    Privacy Policy.
                  </a>
                </Typography>
              </form>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}
