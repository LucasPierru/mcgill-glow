"use server";

import { eventCreateSchema } from "@/lib/validation/events";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function CreateEvent(context: z.infer<typeof eventCreateSchema>) {
  const supabase = await createClient();
  try {
    const post = eventCreateSchema.parse(context);
    const { data, error } = await supabase
      .from("events")
      .insert({
        name: post.name,
        creator_id: post.user_id,
      })
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
