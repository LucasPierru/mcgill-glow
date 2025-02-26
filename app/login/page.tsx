import { LoginHeader, LoginSection } from "@/components/login";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Login = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  user && redirect("/admin/posts");

  return (
    <>
      <LoginHeader />{" "}
      <div className="mx-auto mt-5 max-w-md">
        <LoginSection />
      </div>
    </>
  );
};

export default Login;
