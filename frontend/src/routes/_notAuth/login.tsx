import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useLogin } from "../../hook/auth.hook";
import { useAuth } from "../../hook/useAuth";

export const Route = createFileRoute("/_notAuth/login")({
  component: Login,
});

export type Login = {
  username: string;
  password: string;
};
const yupSchema = yup.object({
  username: yup.string().nullable().required("* is required"),
  password: yup.string().nullable().required("* is required"),
});

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const form = useForm<Login>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(yupSchema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { mutate, isPending } = useLogin();
  const onSubmit = (data: Login) => {
    mutate(
      { data },
      {
        onSuccess: (res) => {
          signIn(res);
          if (res.role == "ADMIN") {
            navigate({ to: "/admin" });
          } else {
            navigate({ to: "/" });
          }
        },
      }
    );
  };
  return (
    <>
      <section className="px-8">
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
                Login
              </Typography>
              <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                Enjoy quick and secure access to your accounts on various
                Clothes Shop platforms.
              </Typography>
            </CardHeader>
            <CardBody>
              <form
                action="#"
                className="flex flex-col gap-4 md:mt-12"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label htmlFor="email">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium mb-2"
                    >
                      Username
                      <span className="text-red-400 ml-2">
                        {errors?.username?.message}
                      </span>
                    </Typography>
                  </label>
                  <Input
                    id="text"
                    color="gray"
                    size="lg"
                    {...register("username")}
                    placeholder="eg. username01"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium mb-2"
                    >
                      Password
                      <span className="text-red-400 ml-2">
                        {errors?.password?.message}
                      </span>
                    </Typography>
                  </label>
                  <Input
                    id="password"
                    color="gray"
                    size="lg"
                    type="password"
                    {...register("password")}
                    placeholder="password"
                    className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                    labelProps={{
                      className: "hidden",
                    }}
                  />
                </div>
                <Button
                  size="lg"
                  color="gray"
                  className="bg-black-2 text-center"
                  type="submit"
                  loading={isPending}
                  fullWidth
                >
                  {isPending ? "Loading..." : "Login"}
                </Button>
                <div className="text-center">
                  <p>
                    Don’t have any account?{" "}
                    <Link to="/register" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
                <Button
                  variant="outlined"
                  size="lg"
                  color="blue"
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
