"use client";

import { CreateEvent } from "@/actions/event/create-event";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { protectedEventConfig } from "@/config/protected";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const EventCreateButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);

  // Check authentitication and bookmark states
  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  async function createEvent() {
    setIsLoading(true);

    if (user?.id) {
      const post = {
        name: protectedEventConfig.untitled,
        user_id: user.id,
      };

      const response = await CreateEvent(post);

      if (response) {
        toast.success(protectedEventConfig.successCreate);
        // This forces a cache invalidation.
        router.refresh();
        // Redirect to the new post
        router.push("/admin/events/" + response.id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(protectedEventConfig.errorCreate);
      }
    } else {
      setIsLoading(false);
      toast.error(protectedEventConfig.errorCreate);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={createEvent}
        className="flex items-center rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
      >
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {protectedEventConfig.newEvent}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              {protectedEventConfig.pleaseWait}
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EventCreateButton;
