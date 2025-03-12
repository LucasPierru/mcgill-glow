import * as z from "zod";

export const memberEditFormSchema = z.object({
  full_name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(120, {
      message: "Name must not be longer than 120 characters.",
    }),
  email: z
    .string().email({ message: "Must be a valid email" }),
  description: z.string(),
  is_approved: z.boolean().optional(),
  is_active: z.boolean().optional(),
  token: z.string().optional(),
});

export const memberUpdateSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  email: z.string().email(),
  description: z.string().optional(),
  is_approved: z.boolean().optional(),
  is_active: z.boolean().optional(),
  token: z.string().optional(),
});