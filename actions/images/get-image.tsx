"use server";

import { createClient } from "@/utils/supabase/server";

export async function getImageFileName(bucketName: string, path: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(`${path}`, {
      limit: 1,
      offset: 0,
      sortBy: { column: "created_at", order: "asc" },
    });

  if (error) {
    console.log("Error has occured while collection filenames from bucket!");
    console.log("Error message : ", error.message);
    return null;
  }

  if (data && data.length > 0) {
    return data[0].name;
  }
  return null;
}

export async function getImageUrl(
  bucketName: string,
  path: string,
  fileName: string
) {
  const supabase = await createClient();
  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${path}/${fileName}`);

  return data.publicUrl;
}
