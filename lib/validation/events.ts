import * as z from "zod";

export const bookmarkSchema = z.object({
  id: z.string(),
  user_id: z.string(),
});

export const eventCreateSchema = z.object({
  name: z.string(),
  user_id: z.string(),
});

export const eventDeleteSchema = z.object({
  id: z.string(),
});

export const eventEditFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(120, {
      message: "Name must not be longer than 120 characters.",
    }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters.",
    })
    .max(100, {
      message: "Slug must not be longer than 100 characters.",
    }),
  description: z
    .string()
    .min(2, {
      message: "Description must be at least 2 characters.",
    })
    .max(300, {
      message: "Description must not be longer than 300 characters.",
    }),
  about: z.any().optional(),
  image: z.string().optional(),
  date: z.string().optional(),
  starttime: z.string().optional(),
  endtime: z.string().optional(),
  place: z.string().optional(),
  address: z.string().optional(),
  registrationlink: z.string().optional(),
});

export const eventUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  about: z.string().optional(),
  image: z.string().optional(),
  date: z.string().optional(),
  starttime: z.string().optional(),
  endtime: z.string().optional(),
  place: z.string().optional(),
  address: z.string().optional(),
  registrationlink: z.string().optional(),
});
