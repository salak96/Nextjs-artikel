import { prisma } from "@/lib/prisma";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { AdBanner } from "@/components/ads";
import Sidebar from "../sidebar";
import BlogPostCard from "./blog-post-card";
import { SharedPagination } from "@/components/shared";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BlogCategoryProps {
  slug: string;
  page: number;
}

export default async function BlogCategory({ slug, page }: BlogCategoryProps) {
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

  const limit = 10;
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

  const featured = data[0];
  const latestPosts = data.slice(1, 5);
  const recentPosts = data.slice(5);

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

      {/* Featured Post */}
      {featured && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Featured</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <BlogPostCard post={featured} />
            {latestPosts[0] && <BlogPostCard post={latestPosts[0]} />}
          </div>
        </div>
      )}

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Latest Posts */}
          {latestPosts.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">Latest Posts</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {latestPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">All Posts</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {recentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
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
