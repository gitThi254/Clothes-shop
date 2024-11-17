/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Route } from "../routes/__root";
import { useForm } from "react-hook-form";
import { LoginHttpRes } from "../api/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUpdateProfile } from "../hook/auth.hook";
import { Button } from "@material-tailwind/react";
const yupSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("* is required"),
  phone: yup.string().required("* is required"),
  firstName: yup.string().required("* is required"),
  lastName: yup.string().required("* is required"),
});

export default function Profile() {
  const { authentication } = Route.useRouteContext();
  const form = useForm<LoginHttpRes>({
    defaultValues: authentication?.isUser() ?? {},
    resolver: yupResolver(yupSchema),
  });
  const { register, handleSubmit, formState, watch } = form;
  const { mutate, isPending } = useUpdateProfile();
  const { errors } = formState;
  const onSubmit = (data: LoginHttpRes) => {
    mutate(data, {
      onSuccess: (res) => {
        authentication.signIn(res);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 py-2 text-gray-500 sm:text-sm">
                    Username : {authentication.isUser()?.username}
                  </span>
                  <span className="ml-3"> - </span>
                  <span className="flex select-none items-center pl-3 py-2 text-gray-500 sm:text-sm">
                    Role : {authentication.isUser()?.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  aria-hidden="true"
                  className="size-12 text-gray-300"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
                <span className="ml-2 text-red-400">
                  {errors.firstName?.message}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  {...register("firstName")}
                  type="text"
                  autoComplete="given-name"
                  className="block w-full  pl-4  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
                <span className="ml-2 text-red-400">
                  {errors.lastName?.message}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  {...register("lastName")}
                  type="text"
                  autoComplete="family-name"
                  className="  pl-4  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
                <span className="ml-2 text-red-400">
                  {errors.email?.message}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email")}
                  autoComplete="given-name"
                  className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Phone Number
                <span className="ml-2 text-red-400">
                  {errors.phone?.message}
                </span>
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  type="text"
                  {...register("phone")}
                  autoComplete="family-name"
                  className="block   pl-4  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <Button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          loading={isPending}
        >
          {isPending ? "Loading..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
