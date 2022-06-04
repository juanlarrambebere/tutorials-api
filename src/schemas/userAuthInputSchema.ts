import { z } from "zod";

const bodySchema = z.object({
  email: z
    .string({
      required_error: "email is required",
    })
    .email("email is not a valid email"),
  password: z.string({
    required_error: "password is required",
  }),
});

export const userAuthSchema = z.object({
  body: bodySchema,
});

export type UserAuthInput = z.infer<typeof bodySchema>;
