"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  return (
    <form className="w-full max-w-lg flex flex-col gap-2">
      <Input type="text" placeholder="Name" />
      <Input type="text" placeholder="Email" />
      <Input type="text" placeholder="Subject" />
      <Textarea placeholder="Write your message here" />
      <Button size="lg" className="w-fit self-end mt-4">
        Submit
      </Button>
    </form>
  );
};

export default ContactForm;
