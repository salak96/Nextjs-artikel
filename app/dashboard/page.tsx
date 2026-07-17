import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import {
  FileText,
  FolderTree,
  Users,
  MessageSquare,
  UserCircle,
  Bookmark,
} from "lucide-react";

export default async function DashboardPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const [
    totalPosts,
    totalCategories,
    totalAuthors,
    totalComments,
    totalUsers,
    totalBookmarks,
    recentPosts,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.category.count(),
    prisma.author.count(),
    prisma.comment.count(),
    prisma.user.count(),
    prisma.bookmark.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true, author: true },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your blog</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Total Posts" value={totalPosts} icon={FileText} />
        <DashboardCard title="Categories" value={totalCategories} icon={FolderTree} />
        <DashboardCard title="Authors" value={totalAuthors} icon={Users} />
        <DashboardCard title="Comments" value={totalComments} icon={MessageSquare} />
        <DashboardCard title="Users" value={totalUsers} icon={UserCircle} />
        <DashboardCard title="Bookmarks" value={totalBookmarks} icon={Bookmark} />
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Recent Posts</h2>
        </div>
        <div className="divide-y divide-border">
          {recentPosts.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">No posts yet.</p>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between px-5 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.author?.name} &middot; {post.category?.title}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
