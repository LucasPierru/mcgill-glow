import Image from "next/image";
import { Post } from "@/types/collection.types";
import BlogCard from "./blog-card/blog-card";
import { createClient } from "@/utils/supabase/server";

const Blog = async () => {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      "id, title, image, description, slug, content, created_at, updated_at, likes, admins(id, full_name, avatar_url), comments(id)"
    );

  return (
    <div>
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1613966802194-d46a163af70d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Beauty Background"
            fill
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 w-full lg:w-1/2" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 text-center w-full lg:w-1/2">
          <div className="w-fit mx-auto text-left">
            <h1 className={`text-7xl text-white mb-6 font-playfair`}>BLOG</h1>
            <p className={`text-lg text-white mb-8 font-playfair`}>
              What have we been up to?
              <br />
              Stay tuned for our latest updates!
            </p>
          </div>
        </div>
      </section>
      <section className="my-8 lg:my-16 flex flex-col max-w-5xl mx-auto gap-4 lg:gap-8 px-4">
        <h2 className="text-lg mb-4">All Posts</h2>
        {posts &&
          posts.map((post) => {
            const author = post.admins!;
            return (
              <BlogCard
                key={post.title}
                post={post}
                author={author}
                commentsCount={post.comments.length}
                likesCount={0}
                viewsCount={0}
              />
            );
          })}
      </section>
    </div>
  );
};

export default Blog;
