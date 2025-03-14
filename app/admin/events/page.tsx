import { ProtectedEventTableColumns, ProtectedEventTableTitle } from "@/components/protected/event";
import EventTableEmpty from "@/components/protected/event/event-empty-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import { DataTable } from "@/components/protected/post/table/data-table";
import { detailEventConfig } from "@/config/detail";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: detailEventConfig.title,
  description: detailEventConfig.description,
};

interface EventsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const EventsPage: React.FC<EventsPageProps> = async ({ searchParams }) => {
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
    .from("events")
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
            <ProtectedEventTableTitle />
            <DataTable data={data ? data : []} columns={ProtectedEventTableColumns} filterName="name" />
          </>
        ) : (
          <EventTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default EventsPage;
