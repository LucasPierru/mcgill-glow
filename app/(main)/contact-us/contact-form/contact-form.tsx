"use client";

import { sendEmail } from "@/actions/email/email";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema } from "@/lib/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircleIcon } from "lucide-react";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsLoading(true);
    await sendEmail({
      sender: { name: data.name, address: data.email },
      recipients: [{ name: "Lucas Pierru", address: "lucaspierru7@gmail.com" }],
      subject: data.subject,
      message: data.message,
    });
    form.reset();
    setIsLoading(false);
  };

  const formInputs: { name: keyof ContactFormValues; placeholder: string; type: "input" | "textarea" }[] = [
    {
      name: "name",
      placeholder: "Name",
      type: "input",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "input",
    },
    {
      name: "subject",
      placeholder: "Subject",
      type: "input",
    },
    {
      name: "message",
      placeholder: "Write your message here",
      type: "textarea",
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
                  {input.type === "input" ? (
                    <Input placeholder={input.placeholder} {...field} />
                  ) : (
                    <Textarea placeholder={input.placeholder} {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button size="lg" className="w-fit self-end mt-4">
          {!isLoading ? "Submit" : <LoaderCircleIcon className="h-6 w-6 animate-spin" />}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
