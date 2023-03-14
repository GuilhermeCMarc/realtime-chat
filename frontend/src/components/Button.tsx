import { cva, VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const button = cva(
  "font-medium flex items-center justify-center px-4 py-2 gap-4 rounded-md active:translate-y-[1px] focus:ring-2 outline-none transition-all duration-100 ease-out disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        primary: "bg-indigo9 hover:bg-indigo10 text-white ring-indigo7",
        secondary:
          "text-slate12 border border-slate7 bg-slate3 hover:bg-slate4 focus:bg-slate5 active:bg-slate5 ring-slate7",
        transparent:
          "bg-transparent hover:bg-slate3 focus:bg-slate4 active:bg-slate4 ring-slate7",
      },
      fullWidth: {
        true: "w-full",
      },
      icon: {
        true: "w-10 h-11 px-0 py-0",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export default function Button({
  className,
  intent,
  fullWidth,
  icon,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={button({ className, intent, icon, fullWidth })}
      {...props}
    />
  );
}
