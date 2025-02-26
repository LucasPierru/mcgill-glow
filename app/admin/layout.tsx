import { ProtectedMain } from "@/components/protected/main";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = async ({
  children,
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    // This route can only be accessed by authenticated users.
    // Unauthenticated users will be redirected to the `/login` route.
    redirect("/login");
  }

  return (
    <>
      <ProtectedMain>{children}</ProtectedMain>
    </>
  );
};

export default ProtectedLayout;
