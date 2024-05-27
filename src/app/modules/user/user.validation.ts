import { z } from "zod";

const createUser = z.object({
  body: z.object({
    id: z.number().int().positive().optional(),
    email: z
      .string({
        required_error: "email is required",
      })
      .email(),
    username: z.string(),
    password: z.string().min(6, "password must be at least 6 characters"),
    status: z.string().optional(),
    role: z.string({
      required_error: "role is required",
    }),
  }),
});

export const userValidation = { createUser };
