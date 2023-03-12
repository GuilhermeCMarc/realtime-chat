import { z } from 'zod';

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(50)
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50)
});