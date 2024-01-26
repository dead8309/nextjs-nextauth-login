import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(8, "Password must be at least 8 character"),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 character"),
});
