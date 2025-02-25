import Image from "next/image";
import { Post } from "@/types/post";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <div className="flex border border-gray-400">
      <div className="hidden lg:block relative w-1/2 h-96">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="absolute object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col justify-between p-8 w-full lg:w-1/2">
        <div className="flex flex-col gap-4 -z-20">
          <div className="flex w-full items-center gap-4">
            <div className="relative w-10 h-10">
              <Image
                src={post.author.picture}
                alt={post.author.name}
                fill
                className="absolute w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3>{post.author.name}</h3>
              <p>
                {post.date} - {post.readTime} min read
              </p>
            </div>
          </div>
          <h2 className="text-xl font-medium font-playfair line-clamp-3 leading-10">
            {post.title}
          </h2>
          <p className="text-base line-clamp-3">{post.body}</p>
        </div>
        <div className="relative flex justify-between border-t border-gray-400 pt-2 -z-10">
          <div className="absolute bg-gradient-to-t from-white to-transparent -top-14 h-14 w-full"></div>
          <div className="flex gap-4">
            <span>{post.views} views</span>
            <span>{post.comments} comments</span>
          </div>
          <span>{post.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
