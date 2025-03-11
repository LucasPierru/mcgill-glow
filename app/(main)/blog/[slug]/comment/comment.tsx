import { Comment as CommentType } from "@/types/collection.types";

type CommentProps = {
  comment: Pick<CommentType, "comment" | "created_at" | "id">;
};

const Comment = ({ comment }: CommentProps) => {
  return <div>{comment.comment}</div>;
};

export default Comment;
