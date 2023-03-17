import { cva, VariantProps } from "class-variance-authority";

const cardRow = cva("border-t border-slate6 first:border-t-0 p-5");

export interface CardRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardRow> {}

export default function CardRow({ className, ...props }: CardRowProps) {
  return <div className={cardRow({ className })} {...props} />;
}
