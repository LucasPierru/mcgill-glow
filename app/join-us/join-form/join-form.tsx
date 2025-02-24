"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const JoinForm = () => {
  return (
    <form className="w-full flex flex-col gap-2">
      <Input type="text" placeholder="First Name" />
      <Input type="text" placeholder="Last Name" />
      <Input type="text" placeholder="McGill Email" />
      <Input type="text" placeholder="Tell us about yourself" />
      <Button size="lg" className="w-fit self-end mt-4">
        Join Now
      </Button>
    </form>
  );
};

export default JoinForm;
