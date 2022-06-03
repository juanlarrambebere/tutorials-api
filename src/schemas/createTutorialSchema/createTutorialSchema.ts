import { z } from "zod";

const bodySchema = z.object({
  title: z.string({
    required_error: "title is required",
  }),
  videoUrl: z
    .string()
    .url({
      message: "videoUrl must be a valid url",
    })
    .optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const createTutorialSchema = z.object({
  body: bodySchema,
});

export type CreateTutorialInput = z.infer<typeof bodySchema>;
