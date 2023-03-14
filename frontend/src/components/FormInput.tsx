import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { forwardRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import Input, { InputProps } from "./Input";

export interface FormInputProps extends InputProps {
  label: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  isPassword?: boolean;
}

export default forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, error, isPassword, ...props }: FormInputProps,
  ref
) {
  const [currentType, setCurrentType] = useState<"password" | "text">(
    "password"
  );

  function toggleType() {
    setCurrentType((p) => (p === "password" ? "text" : "password"));
  }

  return (
    <div className="space-y-1 -mt-1">
      <label
        className={`text-sm hover:text-slate12 transition-colors duration-100 ease-out ${
          error ? "text-red11" : "text-slate11"
        }`}
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className="relative">
        <Input
          id={props.id || props.name}
          ref={ref}
          {...props}
          type={isPassword ? currentType : props.type}
          state={error ? "error" : props.state}
          aria-invalid={error ? "true" : "false"}
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleType}
            className="absolute right-2 text-slate11 top-1 h-8 w-8 rounded-md flex items-center justify-center"
          >
            {currentType === "password" ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-red11 text-sm">{error?.message?.toString()}</p>
      )}
    </div>
  );
});
