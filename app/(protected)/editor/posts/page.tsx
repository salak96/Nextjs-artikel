import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import PostTableTitle from "@/components/protected/post/post-table-title";
import { columns } from "@/components/protected/post/table/columns";
import { DataTable } from "@/components/protected/post/table/data-table";
import { protectedPostConfig } from "@/config/protected";
import { Draft } from "@/types/collection";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedPostConfig.title,
  description: protectedPostConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  // In a real implementation, you would verify the JWT token here
  // For now, we'll assume the token is valid and extract the user ID
  // This would be implemented in a proper auth service
  const userId = "user-id-from-token"; // Placeholder

  // Fetch drafts
  const data = await prisma.draft.findMany({
    where: {
      authorId: userId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data || !data.length) {
    notFound();
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
