"use server";

import { imageDeleteGlobalSchema } from "@/lib/validation/image";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function DeleteImage(
  context: z.infer<typeof imageDeleteGlobalSchema>
) {
  const supabase = await createClient();
  try {
    const { bucketName, path, fileName } =
      imageDeleteGlobalSchema.parse(context);

    const { data, error } = await supabase.storage
      .from(bucketName)
      .remove([`${path}/${fileName}`]);

    if (error) {
      console.log(error);
    }
    if (data?.length && data?.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}
