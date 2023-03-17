import { cva, VariantProps } from "class-variance-authority";
import * as Primitive from "@radix-ui/react-toast";

const toast = cva(
  "p-4 rounded-md border translate-x-[var(--radix-toast-swipe-move-x)]",
  {
    variants: {
      type: {
        error: "border-red6 bg-red2",
        success: "border-green6 bg-green2",
        info: "border-slate6 bg-slate2",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

export type ToastType = "error" | "success" | "info";

export interface ToastProps extends VariantProps<typeof toast> {
  title?: string;
  description?: string;
  duration?: number;
  children?: React.ReactNode;
}

export default function Toast({
  type,
  title,
  description,
  duration,
  children,
}: ToastProps) {
  return (
    <Primitive.Provider swipeDirection="right">
      <Primitive.Root duration={duration} className={toast({ type })}>
        {title && <Primitive.Title>{title}</Primitive.Title>}
        {description && (
          <Primitive.Description className="text-slate11 text-sm">
            {description}
          </Primitive.Description>
        )}
        {children && (
          <Primitive.Action altText="some-text" asChild>
            {children}
          </Primitive.Action>
        )}
      </Primitive.Root>
      <Primitive.Viewport />
    </Primitive.Provider>
  );
}
