import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import PostHeader from "../post-header/post-header";
import readingTime from "reading-time";
import PostContent from "./post-content/post-content";
import Comment from "./comment/comment";
import AddComment from "./add-comment/add-comment";

type PostPageProps = {
  params: { slug: string };
};

export default async function PostPage({ params }: PostPageProps) {
  const supabase = await createClient();
  const bucketNameCoverImage = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE!;
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      "id, title, image, description, slug, content, created_at, updated_at, admins(id, full_name, avatar_url), comments(id, comment, created_at, is_visible)"
    )
    .eq("slug", params.slug)
    .eq("comments.is_visible", true)
    .order("created_at", { referencedTable: "comments", ascending: false })
    .single();

  if (!post) {
    return notFound;
  }

  const readTime = readingTime(post.content ? post.content : "");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto p-8">
      <div className="px-12 py-8 border border-border">
        <PostHeader
          authorPicture={post.admins!.avatar_url}
          authorName={post.admins!.full_name!}
          postDate={post.created_at!}
          postReadTime={Math.round(readTime.minutes)}
        />
        <h1 className="text-xl font-medium">{post.title}</h1>
        <p className="py-2 text-sm text-muted-foreground">{post.description}</p>
        {/* Content */}
        <div className="relative mx-auto border-slate-500/50 py-5">
          <PostContent content={post.content!} />
        </div>
      </div>
      <div className="flex flex-col gap-8 px-12 py-4 border border-border">
        <h3 className="border-b border-foreground py-4">Comments</h3>
        <AddComment postId={post.id} />
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} user={user} />
        ))}
      </div>
    </div>
  );
}
