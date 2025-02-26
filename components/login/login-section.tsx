"use client";

import { sharedLoginConfig } from "@/config/shared";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormSchema = z.object({
  email: z
    .string({
      required_error: sharedLoginConfig.emailRequiredError,
    })
    .email(),
  password: z.string({
    required_error: sharedLoginConfig.passwordRequiredError,
  }),
});

interface LoginSectionProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginSection: React.FC<LoginSectionProps> = ({ setOpen }) => {
  const supabase = createClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  console.log({ errors });

  async function signInWithEmail(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log({ email, error });
    router.refresh();
  }

  return (
    <>
      <div className="mx-auto w-full justify-center rounded-md border border-black/5 bg-gray-50 align-middle shadow-md">
        <div className="flex flex-col items-center justify-center space-y-3 border-b px-4 py-8 text-center">
          <Link className="text-xl font-playfair" href="/">
            McGill GLOW
          </Link>
          {/* <h3 className="font-display text-2xl font-bold">
            {sharedLoginConfig.title}
          </h3> */}
          <form
            onSubmit={handleSubmit(signInWithEmail)}
            className="flex flex-col space-y-4"
          >
            <Input
              id="email"
              placeholder="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              id="password"
              placeholder="Password"
              {...register("password")}
              error={errors.password?.message}
              type="password"
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSection;
