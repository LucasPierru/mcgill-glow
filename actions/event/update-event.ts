"use server";

import { eventUpdateSchema } from "@/lib/validation/events";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function UpdateEvent(context: z.infer<typeof eventUpdateSchema>) {
  const supabase = await createClient();
  try {
    const event = eventUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("events")
      .update(event)
      .match({ id: event.id })
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
