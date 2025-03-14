"use server";

import { commentDeleteSchema } from "@/lib/validation/comment";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function DeleteComment(
  context: z.infer<typeof commentDeleteSchema>
) {
  const supabase = await createClient();
  try {
    const comment = commentDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("comments")
      .update({ is_visible: false })
      .match({ id: comment.id })
      .select();

    if (error) {
      console.log(error);
      return false;
    }
    if (data && data.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}
