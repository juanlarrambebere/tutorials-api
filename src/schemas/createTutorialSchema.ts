import { z } from "zod";

export const createTutorialSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    videoUrl: z
      .string()
      .url({
        message: "video_url must be a valid url",
      })
      .optional(),
    description: z.string().optional(),
    status: z.string().optional(),
  }),
});

export type CreateTutorialInput = z.infer<typeof createTutorialSchema>["body"];
