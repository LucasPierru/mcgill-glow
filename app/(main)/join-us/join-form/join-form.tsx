"use client";

import { sendEmail } from "@/actions/email/email";
import { CreateMember } from "@/actions/member/create-member";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { JoinUsFormSchema } from "@/lib/validation/join";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const JoinForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  type ContactFormValues = z.infer<typeof JoinUsFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(JoinUsFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    await CreateMember({
      full_name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      description: data.description,
    });
    form.reset();
    setIsLoading(false);
  };

  const formInputs: { name: keyof ContactFormValues; placeholder: string; type: "input" | "textarea" }[] = [
    {
      name: "firstName",
      placeholder: "First Name",
      type: "input",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      type: "input",
    },
    {
      name: "email",
      placeholder: "McGill Email",
      type: "input",
    },
    {
      name: "description",
      placeholder: "Tell us about yourself",
      type: "input",
    },
  ];
  return (
    <Form {...form}>
      <form className="w-full max-w-lg flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        {formInputs.map((input) => (
          <FormField
            key={input.name}
            control={form.control}
            name={input.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={input.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button size="lg" className="w-fit self-end mt-4">
          {!isLoading ? "Join Now" : <LoaderCircleIcon className="h-6 w-6 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default JoinForm;
