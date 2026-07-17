import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Search } from "lucide-react";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string; q?: string };
}) {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const page = Math.max(1, Number(searchParams.page) || 1);
  const limit = 10;
  const q = searchParams.q || "";

  const where = q
    ? { title: { contains: q } }
    : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { category: true, author: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.post.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Posts</h1>
          <p className="text-sm text-muted-foreground">Manage your posts</p>
        </div>
        <Link
          href="/editor/posts/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <form className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          name="q"
          defaultValue={q}
          placeholder="Search posts..."
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Search
        </button>
      </form>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Created</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {post.image && (
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            img
                          </div>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{post.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{post.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{post.category?.title || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{post.author?.name || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        View
                      </Link>
                      <Link
                        href={`/editor/posts/${post.id}`}
                        className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-sm text-muted-foreground">
              Page {page} of {totalPages} ({total} total)
            </p>
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/posts?page=${page - 1}${q ? `&q=${q}` : ""}`}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  page <= 1
                    ? "pointer-events-none text-muted-foreground/50"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Previous
              </Link>
              <Link
                href={`/dashboard/posts?page=${page + 1}${q ? `&q=${q}` : ""}`}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  page >= totalPages
                    ? "pointer-events-none text-muted-foreground/50"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
