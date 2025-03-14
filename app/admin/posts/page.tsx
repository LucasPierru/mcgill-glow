import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import PostTableTitle from "@/components/protected/post/post-table-title";
import { columns } from "@/components/protected/post/table/columns";
import { DataTable } from "@/components/protected/post/table/data-table";
import { protectedPostConfig } from "@/config/protected";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedPostConfig.title,
  description: protectedPostConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const supabase = await createClient();
  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch posts
  const { data, error } = await supabase
    .from("posts")
    .select(`*`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id });

  if (!data || error || !data.length) {
    notFound;
  }

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <PostTableTitle />
            <DataTable data={data ? data : []} columns={columns} />
          </>
        ) : (
          <PostTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default PostsPage;
