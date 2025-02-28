"use client";

import { DeleteEvent } from "@/actions/event/delete-event";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { detailEventConfig } from "@/config/detail";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Loader2 as SpinnerIcon, Trash as TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProtectedEventDeleteButtonProps {
  id?: string;
}

const ProtectedEventDeleteButton: React.FC<ProtectedEventDeleteButtonProps> = ({
  id,
}) => {
  const supabase = createClient();
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);

  // Check authentitication and Event states
  React.useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [id, supabase.auth]);

  // Delete a Event
  async function deleteEvent() {
    setIsDeleteLoading(true);
    if (id && user?.id) {
      const savedPostData = {
        id: id,
      };
      const response = await DeleteEvent(savedPostData);
      if (response) {
        setIsDeleteLoading(false);
        toast.success(detailEventConfig.successDelete);
        router.refresh();
      } else {
        setIsDeleteLoading(false);
        toast.error(detailEventConfig.errorDelete);
      }
    } else {
      setIsDeleteLoading(false);
      toast.error(detailEventConfig.errorDelete);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowDeleteAlert(true)}
        className="rounded-md border bg-gray-50 px-3 py-2 text-gray-900 hover:bg-gray-100"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="text-md font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle>{detailEventConfig.question}</AlertDialogTitle>
            <AlertDialogDescription>
              {detailEventConfig.warning}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{detailEventConfig.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={deleteEvent}>
              {isDeleteLoading ? (
                <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <TrashIcon className="mr-2 h-4 w-4" />
              )}
              <span>{detailEventConfig.confirm}</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProtectedEventDeleteButton;
