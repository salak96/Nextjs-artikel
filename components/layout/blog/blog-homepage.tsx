import { prisma } from "@/lib/prisma";
import { PostWithCategoryWithProfile } from "@/types/collection";
import { AdBanner } from "@/components/ads";
import Sidebar from "../sidebar";
import FeaturedPost from "./featured-post";
import BlogPostCard from "./blog-post-card";
import { SharedPagination } from "@/components/shared";

interface BlogHomepageProps {
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

export default async function BlogHomepage({ page }: BlogHomepageProps) {
  let data: PostWithCategoryWithProfile[] = [];
  let totalPages = 0;
  let dbError = false;

  try {
    const result = await getPosts(page, 10);
    data = result.data;
    totalPages = result.count ? Math.ceil(result.count / 10) : 0;
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

  const featured = data[0];
  const latestPosts = data.slice(1, 5);
  const recentPosts = data.slice(5);

  return (
    <div className="space-y-8">
      {/* Top Banner Ad */}
      <AdBanner width={728} height={90} className="mx-auto max-w-4xl" />

      {/* Featured Post */}
      <FeaturedPost post={featured} />

      {/* Main Content + Sidebar */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Latest Posts 2 Column */}
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
              <h2 className="mb-4 text-lg font-bold text-foreground">Recent Posts</h2>
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
              baseUrl="/"
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
