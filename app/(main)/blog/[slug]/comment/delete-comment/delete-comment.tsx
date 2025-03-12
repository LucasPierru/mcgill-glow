"use client";

import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { DeleteComment } from "@/actions/comment/delete-comment";
import { useRouter } from "next/navigation";

const DeleteCommentButton = ({ commentId }: { commentId: string }) => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="destructive"
      className="rounded-full h-8 w-8"
      onClick={async () => {
        await DeleteComment({ id: commentId });
        router.refresh();
      }}>
      <Trash2Icon className="w-6 h-6" />
    </Button>
  );
};

export default DeleteCommentButton;
