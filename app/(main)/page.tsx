import { MainPostItem, MainPostItemLoading } from "@/components/main";
import { SharedPagination } from "@/components/shared";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { Suspense } from "react";
import { v4 } from "uuid";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export const dynamic = "force-dynamic";

async function getPosts(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [count, data] = await Promise.all([
    prisma.post.count(),
    prisma.post.findMany({
      include: { category: true, author: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);
  return { count, data };
}

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const limit = 10;
  const page =
    typeof searchParams.page === "string" && +searchParams.page > 1
      ? +searchParams.page
      : 1;

  let data: PostWithCategoryWithProfile[] = [];
  let totalPages = 0;
  let dbError = false;

  try {
    const result = await getPosts(page, limit);
    data = result.data;
    totalPages = result.count ? Math.ceil(result.count / limit) : 0;
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Server Sibuk</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Database sedang tidak tersedia. Silakan coba lagi beberapa saat.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Belum Ada Artikel</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Belum ada artikel yang dipublikasikan. Kembali lagi nanti.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {data.map((post) => (
          <Suspense key={v4()} fallback={<MainPostItemLoading />}>
            <MainPostItem post={post} />
          </Suspense>
        ))}
      </div>
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
