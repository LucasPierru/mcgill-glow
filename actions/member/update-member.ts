"use server";

import { memberUpdateSchema } from "@/lib/validation/member";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";

export async function UpdateMember(context: z.infer<typeof memberUpdateSchema>) {
  const supabase = await createClient();
  try {
    const member = memberUpdateSchema.parse(context);

    const { data, error } = await supabase
      .from("members")
      .update(member)
      .match({ id: member.id })
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
