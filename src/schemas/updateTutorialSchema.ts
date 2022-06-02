import { z } from "zod";
import { tutorialParamsSchema } from "./getTutorialSchema";

const bodySchema = z.object({
  title: z.string().optional(),
  videoUrl: z
    .string()
    .url({
      message: "videoUrl must be a valid url",
    })
    .optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});

export const updateTutorialSchema = z.object({
  body: bodySchema,
  params: tutorialParamsSchema,
});

export type UpdateTutorialInput = z.infer<typeof updateTutorialSchema>["body"];
