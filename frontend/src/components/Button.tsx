import { cva, VariantProps } from "class-variance-authority";

const button = cva(
  "font-medium flex items-center justify-center px-4 py-2 rounded-md active:translate-y-[1px] focus:ring-2 outline-none transition-all duration-100 ease-out",
  {
    variants: {
      intent: {
        primary: "bg-indigo9 hover:bg-indigo10 text-white ring-indigo7",
        secondary:
          "text-white bg-slate3 hover:bg-slate4 focus:bg-slate5 active:bg-slate5 ring-slate7",
        transparent:
          "bg-transparent hover:bg-slate3 focus:bg-slate4 active:bg-slate4 ring-slate7",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({
  className,
  intent,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ className, intent, fullWidth })} {...props} />
  );
}
