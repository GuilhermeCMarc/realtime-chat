import { AvatarIcon } from "@radix-ui/react-icons";
import { cva, VariantProps } from "class-variance-authority";
import { User } from "../../types/user";

const avatar = cva("grid place-items-center h-12 w-12 bg-slate3", {
  variants: {
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
  },
  defaultVariants: {
    rounded: false,
  },
});

export interface AvatarProps extends VariantProps<typeof avatar> {
  user: User;
  className?: string;
}

export default function Avatar({ user, className, rounded }: AvatarProps) {
  return (
    <>
      {user.avatarUrl ? (
        <img
          className={avatar({ className, rounded })}
          src={user.avatarUrl}
          alt={user.name}
        />
      ) : (
        <div className={avatar({ className, rounded })}>
          <AvatarIcon />
        </div>
      )}
    </>
  );
}
