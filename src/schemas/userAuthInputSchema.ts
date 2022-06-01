import { z } from "zod";

export const userAuthSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "email is required",
      })
      .email("email is not a valid email"),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export type UserAuthInput = z.infer<typeof userAuthSchema>["body"];
