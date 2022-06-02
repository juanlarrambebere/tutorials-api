import { z } from "zod";
import { MAX_LIMIT } from "../services/tutorialsService";

const filtersSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const pagingSchema = z.object({
  limit: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true;
        const number = parseInt(value);

        if (Number.isNaN(number)) {
          return false;
        }

        return number >= 0 && number <= MAX_LIMIT;
      },
      {
        message: `limit must be between 0 and ${MAX_LIMIT}`,
      }
    )
    .transform((value) => (value === undefined ? value : parseInt(value))),
  offset: z
    .string()
    .optional()
    .refine((value) => value === undefined || !Number.isNaN(parseInt(value)), {
      message: `offset must be a number`,
    })
    .transform((value) => (value === undefined ? value : parseInt(value))),
});

const sortingSchema = z.object({
  sortBy: z.union([z.literal("id"), z.literal("-id")]).optional(),
});

export const listTutorialsSchema = z.object({
  query: filtersSchema.merge(pagingSchema).merge(sortingSchema),
});

export type ListTutorialsFilters = z.infer<typeof filtersSchema>;

export type ListTutorialsPaging = z.infer<typeof pagingSchema>;

export type ListTutorialsSorting = z.infer<typeof sortingSchema>;
