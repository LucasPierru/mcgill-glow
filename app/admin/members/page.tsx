import { ProtectedMemberTableColumns, ProtectedMemberTableTitle } from "@/components/protected/members";
import MemberTableEmpty from "@/components/protected/members/member-empty-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import { DataTable } from "@/components/protected/post/table/data-table";
import protectedMemberConfig from "@/config/protected/protected-member-config";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: protectedMemberConfig.title,
  description: protectedMemberConfig.description,
};

export const revalidate = 0;

interface MembersPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const MembersPage = async ({ searchParams }: MembersPageProps) => {
  const supabase = await createClient();
  // Fetch total pages
  const { count } = await supabase.from("events").select("*", { count: "exact", head: true });

  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pagination
  const limit = 10;
  const totalPages = count ? Math.ceil(count / limit) : 0;
  const page =
    typeof searchParams.page === "string" && +searchParams.page > 1 && +searchParams.page <= totalPages
      ? +searchParams.page
      : 1;
  const from = (page - 1) * limit;
  const to = page ? from + limit : limit;

  // Fetch posts
  const { data, error } = await supabase
    .from("members")
    .select(`*`)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (!data || error || !data.length) {
    notFound;
  }

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <ProtectedMemberTableTitle />
            <DataTable data={data ? data : []} columns={ProtectedMemberTableColumns} filterName="full_name" />
          </>
        ) : (
          <MemberTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default MembersPage;
