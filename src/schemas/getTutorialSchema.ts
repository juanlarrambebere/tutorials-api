import { z } from "zod";

export const tutorialParamsSchema = z.object({
  id: z
    .string({
      required_error: "id is required",
    })
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: `id must be a number`,
    })
    .transform((value) => parseInt(value)),
});

export const getTutorialSchema = z.object({
  params: tutorialParamsSchema,
});
