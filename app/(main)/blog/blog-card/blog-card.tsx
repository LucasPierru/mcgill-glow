import Image from "next/image";
import readingTime from "reading-time";
import { Post, Profile } from "@/types/collection.types";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import PostHeader from "../post-header/post-header";

type BlogCardProps = {
  post: Omit<Post, "author_id" | "published">;
  author: Pick<Profile, "id" | "full_name" | "avatar_url">;
  viewsCount: number;
  commentsCount: number;
  likesCount: number;
};

async function getPublicImageUrl(path: string, fileName: string) {
  const supabase = await createClient();
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE || "cover-image";
  const { data } = supabase.storage.from(bucketName).getPublicUrl(`${path}/${fileName}`);

  if (data && data.publicUrl) return data.publicUrl;

  return "/images/not-found.jpg";
}

const BlogCard = async ({ post, author, viewsCount, commentsCount, likesCount }: BlogCardProps) => {
  const readTime = readingTime(post.content ? post.content : "");

  return (
    <Link href={`/blog/${post.slug}`} className="flex border border-gray-400">
      <div className="hidden lg:block relative w-1/2 h-96">
        <Image
          src={await getPublicImageUrl(`${author.id}/${post.id}`, post.image || "")}
          alt={post.title!}
          fill
          className="absolute object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-between p-8 w-full lg:w-1/2">
        <div className="flex flex-col gap-4 -z-20">
          <PostHeader
            authorPicture={author.avatar_url}
            authorName={author.full_name!}
            postDate={post.created_at!}
            postReadTime={Math.round(readTime.minutes)}
          />
          <h2 className="text-xl font-medium font-playfair line-clamp-3 leading-10">{post.title}</h2>
          <p className="text-base line-clamp-3">{post.description}</p>
        </div>
        <div className="relative flex justify-between border-t border-gray-400 pt-2 -z-10">
          <div className="absolute bg-gradient-to-t from-white to-transparent -top-14 h-14 w-full"></div>
          <div className="flex gap-4">
            <span>{viewsCount} views</span>
            <span>{commentsCount} comments</span>
          </div>
          <span>{likesCount} likes</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
