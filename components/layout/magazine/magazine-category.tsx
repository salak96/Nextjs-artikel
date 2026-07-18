import { prisma } from "@/lib/prisma";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { AdBanner } from "@/components/ads";
import Sidebar from "../sidebar";
import MagazinePostCard from "./magazine-post-card";
import { SharedPagination } from "@/components/shared";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface MagazineCategoryProps {
  slug: string;
  page: number;
}

export default async function MagazineCategory({ slug, page }: MagazineCategoryProps) {
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">Category Not Found</h2>
        </div>
      </div>
    );
  }

  const limit = 20;
  const skip = (page - 1) * limit;
  const [count, data] = await Promise.all([
    prisma.post.count({ where: { categoryId: category.id } }),
    prisma.post.findMany({
      where: { categoryId: category.id },
      include: { category: true, author: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  const totalPages = count ? Math.ceil(count / limit) : 0;

  if (!data || !data.length) {
    return (
      <div className="space-y-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{category.title}</span>
        </nav>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">No Articles Yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              No articles in this category yet. Check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const heroPosts = data.slice(0, 3);
  const trending = data.slice(0, 5);
  const latest = data.slice(0, 8);
  const popular = data.slice(0, 5);
  const remaining = data.slice(8);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{category.title}</span>
      </nav>

      {/* Category Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">{category.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {count} article{count !== 1 ? "s" : ""} in this category
        </p>
      </div>

      {/* Top Banner Ad */}
      <AdBanner width={728} height={90} className="mx-auto max-w-4xl" />

      {/* Featured + Trending + Popular */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-foreground">Featured</h2>
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

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-foreground">All Posts</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {latest.map((post) => (
              <MagazinePostCard key={post.id} post={post} />
            ))}
          </div>

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
              baseUrl={`/category/${slug}`}
              pageUrl="?page="
            />
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
