import { Input, IconButton, Typography } from "@material-tailwind/react";
import { useFormContext } from "react-hook-form";
import { CartHttpReq } from "../../routes/products/$id";
import { useEffect } from "react";

export function InputAmountButtons({ max }: { max: number }) {
  const form = useFormContext<CartHttpReq>();
  const { register, formState, getValues, setValue, watch } = form;
  useEffect(() => {
    setValue("qty", 0);
  }, [max]);
  useEffect(() => {
    if (watch("qty") > max) {
      setValue("qty", max);
    }
  }, [watch("qty")]);
  return (
    <div className="w-80">
      <div className="relative w-full">
        <Input
          type="number"
          {...register("qty")}
          max={max}
          className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-blue-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
        <div className="absolute right-1 top-1 flex gap-0.5 bg-black">
          <IconButton
            size="sm"
            className="rounded"
            onClick={() =>
              setValue(
                "qty",
                Number(getValues("qty")) === 0
                  ? 0
                  : Number(getValues("qty")) - 1
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
            </svg>
          </IconButton>
          <IconButton
            size="sm"
            className="rounded"
            onClick={() =>
              setValue(
                "qty",
                getValues("qty") === max
                  ? max
                  : Number(getValues("qty")) + Number(1)
              )
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </IconButton>
        </div>
      </div>
    </div>
  );
}
