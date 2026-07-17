import { MainPostItem, MainPostItemLoading } from "@/components/main";
import { SharedPagination } from "@/components/shared";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { v4 } from "uuid";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  // Pagination
  const limit = 10;
  const page =
    typeof searchParams.page === "string" &&
    +searchParams.page > 1
      ? +searchParams.page
      : 1;
  const skip = (page - 1) * limit;

  // Fetch total pages
  const count = await prisma.post.count();

  const totalPages = count ? Math.ceil(count / limit) : 0;

  // Fetch posts
  const data = await prisma.post.findMany({
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: limit,
  });

  if (!data || !data.length) {
    notFound();
  }

  return (
    <>
      <div className="space-y-6">
        {data?.map((post) => (
          <Suspense key={v4()} fallback={<MainPostItemLoading />}>
            <MainPostItem post={post} />
          </Suspense>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <SharedPagination
          page={page}
          totalPages={totalPages}
          baseUrl="/"
          pageUrl="?page="
        />
      )}
    </>
  );
}
