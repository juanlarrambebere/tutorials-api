import { z } from "zod";
import { tutorialParamsSchema } from "./getTutorialSchema";

export const deleteTutorialSchema = z.object({
  params: tutorialParamsSchema,
});
