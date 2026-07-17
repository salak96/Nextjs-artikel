import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { FolderTree } from "lucide-react";

export default async function CategoriesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-sm text-muted-foreground">Manage blog categories</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Posts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{cat.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {cat._count.posts}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
