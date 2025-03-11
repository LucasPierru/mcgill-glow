"use server";

import { memberCreateSchema } from "@/lib/validation/join";
import { createClient } from "@/utils/supabase/server";
import * as z from "zod";
import { sendEmail } from "../email/email";

export async function CreateMember(context: z.infer<typeof memberCreateSchema>) {
  const supabase = await createClient();
  try {
    const member = memberCreateSchema.parse(context);
    const { data, error } = await supabase
      .from("members")
      .insert({
        full_name: member.full_name,
        email: member.email,
        description: member.description
      })
      .select()
      .single();

    if (error) {
      console.log(error);
      return null;
    }

    await sendEmail({
      sender: { name: `${member.full_name}`, address: member.email },
      recipients: [{ name: "Lucas Pierru", address: "lucaspierru7@gmail.com" }],
      subject: `${member.full_name} wants to join McGill Glow`,
      message: member.description,
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
