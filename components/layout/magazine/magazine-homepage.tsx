import { prisma } from "@/lib/prisma";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { AdBanner, AdSidebar } from "@/components/ads";
import Sidebar from "../sidebar";
import HeroSlider from "./hero-slider";
import MagazinePostCard from "./magazine-post-card";
import Link from "next/link";
import { SharedPagination } from "@/components/shared";

interface MagazineHomepageProps {
  page: number;
}

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

async function getPostsByCategory(categorySlug: string, take: number) {
  const category = await prisma.category.findUnique({
    where: { slug: categorySlug },
  });
  if (!category) return [];
  return prisma.post.findMany({
    where: { categoryId: category.id },
    include: { category: true, author: true },
    orderBy: { createdAt: "desc" },
    take,
  });
}

export default async function MagazineHomepage({ page }: MagazineHomepageProps) {
  let data: PostWithCategoryWithProfile[] = [];
  let totalPages = 0;
  let dbError = false;

  try {
    const result = await getPosts(page, 20);
    data = result.data;
    totalPages = result.count ? Math.ceil(result.count / 20) : 0;
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mt-4 text-xl font-semibold text-foreground">Server Error</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Database is currently unavailable. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="mt-4 text-xl font-semibold text-foreground">No Articles Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No articles have been published yet. Check back later.
          </p>
        </div>
      </div>
    );
  }

  const heroPosts = data.slice(0, 5);
  const trending = data.slice(0, 5);
  const latest = data.slice(0, 8);
  const popular = data.slice(0, 5);
  const editorsChoice = data.slice(0, 3);
  const remaining = data.slice(8);

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner width={728} height={90} className="mx-auto max-w-4xl" />

      {/* Breaking News Ticker */}
      {data.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 overflow-hidden">
          <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white animate-pulse">
            BREAKING
          </span>
          <div className="overflow-hidden">
            <Link
              href={`/posts/${data[0].slug}`}
              className="truncate text-sm font-medium text-foreground hover:text-primary"
            >
              {data[0].title}
            </Link>
          </div>
        </div>
      )}

      {/* Hero Slider */}
      <HeroSlider posts={heroPosts} />

      {/* Featured News + Trending + Popular */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-foreground">Featured News</h2>
          {data[0] && (
            <MagazinePostCard post={data[0]} variant="featured" />
          )}
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Trending</h2>
          <div className="space-y-1">
            {trending.map((post) => (
              <MagazinePostCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Popular</h2>
          <div className="space-y-1">
            {popular.map((post, i) => (
              <div key={post.id} className="flex items-start gap-3 rounded-lg p-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <Link
                  href={`/posts/${post.slug}`}
                  className="min-w-0 text-sm font-medium text-card-foreground hover:text-primary"
                >
                  <span className="line-clamp-2">{post.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor's Choice */}
      {editorsChoice.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Editor&apos;s Choice</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {editorsChoice.map((post) => (
              <MagazinePostCard key={post.id} post={post} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-foreground">Latest News</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {latest.map((post) => (
              <MagazinePostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Remaining posts */}
          {remaining.length > 0 && (
            <div className="space-y-4">
              {remaining.map((post) => (
                <MagazinePostCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <SharedPagination
              page={page}
              totalPages={totalPages}
              baseUrl="/"
              pageUrl="?page="
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
