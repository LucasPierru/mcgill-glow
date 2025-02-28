"use server";

import { eventDeleteSchema } from "@/lib/validation/events";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export const DeleteEvent = async (
  context: z.infer<typeof eventDeleteSchema>
) => {
  const supabase = await createClient();
  try {
    const event = eventDeleteSchema.parse(context);

    const { data, error } = await supabase
      .from("events")
      .delete()
      .match({ id: event.id })
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
};
