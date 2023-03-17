import { cva, VariantProps } from "class-variance-authority";

const card = cva("rounded-lg border-slate6 bg-slate2 shadow-sm border");

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof card> {}

export default function Card({ className, ...props }: CardProps) {
  return <div className={card({ className })} {...props} />;
}
