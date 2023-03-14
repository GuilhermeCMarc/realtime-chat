import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const input = cva(
  "flex items-center justify-center gap-4 px-4 py-2 rounded-md bg-transparent border w-full text-slate12 placeholder-slate11 outline-none focus:ring-2 transition-all duration-100 ease-out",
  {
    variants: {
      state: {
        default: "border-slate7 ring-slate6",
        error: "border-red7 ring-red6",
        success: "border-green7 ring-green6",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {}

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, state, ...props }: InputProps,
  ref
) {
  return <input className={input({ className, state })} {...props} ref={ref} />;
});
