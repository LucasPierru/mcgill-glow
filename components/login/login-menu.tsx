"use client";

import { Profile } from "@/types/collection.types";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import LoginButton from "./login-button";
import LoginProfileButton from "./login-profile-button";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginMenu = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  useEffect(() => {
    async function fetchAvatar() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ id: user?.id })
        .single<Profile>();
      if (data) {
        setAvatarUrl(data.avatar_url ? data.avatar_url : "");
      }
    }
    fetchAvatar();
  }, [supabase, user?.id]);

  return (
    <>
      {user ? (
        <LoginProfileButton profileImageUrl={avatarUrl} />
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default LoginMenu;
