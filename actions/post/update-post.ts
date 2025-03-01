"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  const supabase = await createClient();
  try {
    const post = postUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("posts")
      .update({
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description,
        image: post.image,
        content: post.content,
      })
      .match({ id: post.id })
      .select()
      .single();

    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
