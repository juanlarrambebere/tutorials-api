import { z } from "zod";

export const getTutorialSchema = z.object({
  params: z.object({
    id: z
      .string({
        required_error: "id is required",
      })
      .refine((value) => !Number.isNaN(parseInt(value)), {
        message: `id must be a number`,
      })
      .transform((value) => parseInt(value)),
  }),
});

export type GetTutorialParams = z.infer<typeof getTutorialSchema>["params"];
