import { format } from "date-fns";
import Image from "next/image";

type PostHeaderProps = {
  authorName: string;
  authorPicture: string | null;
  postDate: string;
  postReadTime: number;
};

const PostHeader = ({ authorName, authorPicture, postDate, postReadTime }: PostHeaderProps) => {
  return (
    <div className="flex w-full items-center gap-4 mb-4">
      <div className="relative w-10 h-10">
        <Image
          src={authorPicture ?? "/images/user-placeholder.png"}
          alt={authorName}
          fill
          className="absolute w-full h-full rounded-full object-cover"
        />
      </div>
      <div>
        <h3>{authorName}</h3>
        <p>
          {format(postDate, "LLL d, yyyy")} - {postReadTime} min read
        </p>
      </div>
    </div>
  );
};

export default PostHeader;
