import * as z from "zod";

export const imageDeleteSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  fileName: z.string(),
});

export const imageDeleteGlobalSchema = z.object({
  path: z.string(),
  bucketName: z.string(),
  fileName: z.string(),
});
