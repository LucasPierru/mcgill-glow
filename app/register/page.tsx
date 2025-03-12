import Link from "next/link";
import RegisterForm from "./register-form/register-form";
import { createClient } from "@/utils/supabase/server";

const RegisterPage = async ({ searchParams }: { searchParams: { email: string; token: string } }) => {
  const { email, token } = searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto mt-5 max-w-md py-8">
      <Link className="text-xl text-center block w-full mb-2 font-playfair" href="/">
        McGill GLOW Registration
      </Link>
      <RegisterForm email={decodeURIComponent(email)} />
    </div>
  );
};

export default RegisterPage;
