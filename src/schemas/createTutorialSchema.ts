import { z } from "zod";

export const createTutorialSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "title is required",
    }),
    video_url: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
  }),
});

export type CreateTutorialInput = z.infer<typeof createTutorialSchema>["body"];
