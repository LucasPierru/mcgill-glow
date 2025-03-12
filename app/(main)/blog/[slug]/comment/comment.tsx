import { Comment as CommentType } from "@/types/collection.types";
import { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import DeleteCommentButton from "./delete-comment/delete-comment";

dayjs().format();

type CommentProps = {
  comment: Pick<CommentType, "comment" | "created_at" | "id">;
  user: User | null;
};

const Comment = ({ comment, user }: CommentProps) => {
  console.log({ user });

  return (
    <div className="border border-primary px-6 py-4">
      <div className="flex justify-between items-center">
        {comment.comment}
        {user && <DeleteCommentButton commentId={comment.id} />}
      </div>
      <span className="block w-full text-right">{dayjs(comment.created_at).format("MMM D, YYYY, HH:mm")}</span>
    </div>
  );
};

export default Comment;
