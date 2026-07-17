import {
  ProtectedBookMarkTableColumns,
  ProtectedBookMarkTableTitle,
} from "@/components/protected/bookmark";
import { DataTable } from "@/components/protected/post/table/data-table";
import { SharedTableEmpty } from "@/components/shared";
import { detailBookMarkConfig } from "@/config/detail";
import { sharedEmptyConfig } from "@/config/shared";
import { BookMarkWithPost, Post } from "@/types/collection";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: detailBookMarkConfig.title,
  description: detailBookMarkConfig.description,
};

interface BookmarksPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const BookmarksPage: React.FC<BookmarksPageProps> = async ({
  searchParams,
}) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  // In a real implementation, you would verify the JWT token here
  // For now, we'll assume the token is valid and extract the user ID
  // This would be implemented in a proper auth service
  const userId = "user-id-from-token"; // Placeholder

  // Pagination
  const limit = 10;
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1
      ? +searchParams.page
      : 1;
  const skip = (page - 1) * limit;

  // Fetch total pages
  const count = await prisma.bookmark.count({
    where: {
      userId: userId,
    },
  });

  const totalPages = count ? Math.ceil(count / limit) : 0;

  // Fetch bookmarks with posts
  const data = await prisma.bookmark.findMany({
    where: {
      userId: userId,
    },
    include: {
      post: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: limit,
  });

  const posts = data.map((bookmark) => bookmark.post);

  if (!data || !data.length) {
    notFound();
  }

  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {posts?.length && posts?.length > 0 ? (
          <>
            <ProtectedBookMarkTableTitle />
            <DataTable data={posts} columns={ProtectedBookMarkTableColumns} />
          </>
        ) : (
          <SharedTableEmpty
            emptyTitle={sharedEmptyConfig.title}
            emptyDescription={sharedEmptyConfig.description}
          />
        )}
      </div>
    </>
  );
};

export default BookmarksPage;
