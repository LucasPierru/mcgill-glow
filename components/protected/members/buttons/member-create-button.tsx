"use client";

import { CreateMember } from "@/actions/member/create-member";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { protectedMemberConfig } from "@/config/protected";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2 as SpinnerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const MemberCreateButton = () => {
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

  async function createMember() {
    setIsLoading(true);

    if (user?.id) {
      const member = {
        full_name: protectedMemberConfig.untitled,
        email: protectedMemberConfig.untitled,
        description: protectedMemberConfig.untitled,
      };

      const response = await CreateMember(member);

      if (response) {
        toast.success(protectedMemberConfig.successCreate);
        // This forces a cache invalidation.
        router.refresh();
        // Redirect to the new post
        router.push("/admin/members/" + response.id);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(protectedMemberConfig.errorCreate);
      }
    } else {
      setIsLoading(false);
      toast.error(protectedMemberConfig.errorCreate);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={createMember}
        className="flex items-center rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600">
        {isLoading && <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />}
        {protectedMemberConfig.newMember}
      </button>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">{protectedMemberConfig.pleaseWait}</AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MemberCreateButton;
