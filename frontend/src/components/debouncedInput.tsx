import { Input } from "@material-tailwind/react";
import { useNavigate } from "@tanstack/react-router";
import { InputHTMLAttributes, useEffect, useState } from "react";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState<string | number>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <label className="w-70 mb-2 input input-bordered flex items-center gap-2">
      <Input
        className="grow"
        label="Search..."
        value={value ?? ""}
        onChange={(e) => {
          if (e.target.value === "") return setValue("");
          if (props.type === "number") {
            setValue(e.target.valueAsNumber);
          } else {
            setValue(e.target.value);
          }
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-8 w-8 opacity-70"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  );
}
