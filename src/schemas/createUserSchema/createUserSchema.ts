import { z } from "zod";
import { USER_ROLES } from "../../models/User";
import { UserRole } from "../../types";

const STRONG_PASSWORD_PATTERN = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const isPasswordSecure = (pwd: string) => STRONG_PASSWORD_PATTERN.test(pwd);

const isRoleValid = (role: string): role is UserRole => {
  return USER_ROLES.find((userRole) => userRole === role) != undefined;
};

const bodySchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  lastName: z.string({
    required_error: "lastName is required",
  }),
  email: z
    .string({
      required_error: "email is required",
    })
    .email({
      message: "email must be a valid email",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .refine(
      (pwd) => isPasswordSecure(pwd),
      "password must contain at least one number, one uppercase and one lowercase letter, one special character and at least 8 characters long"
    ),
  role: z
    .string({
      required_error: "role is required",
    })
    .refine((role) => isRoleValid(role), {
      message: `role must be one of ${USER_ROLES}`,
    })
    .transform((role) => role as UserRole),
});

export const createUserSchema = z.object({
  body: bodySchema,
});

export type CreateUserInput = z.infer<typeof bodySchema>;
