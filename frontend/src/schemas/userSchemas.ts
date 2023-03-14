import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirm: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export type LoginUser = z.infer<typeof userLoginSchema>;
