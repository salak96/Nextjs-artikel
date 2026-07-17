import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { FolderTree } from "lucide-react";
import { CategoryDialog } from "@/components/dashboard/category-dialog";
import { DeleteButton } from "@/components/dashboard/delete-button";
import { ToggleVisibility } from "@/components/dashboard/toggle-visibility";

export default async function CategoriesPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const categories = await prisma.category.findMany({
    orderBy: { title: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">Manage blog categories</p>
        </div>
        <CategoryDialog />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Slug</th>
              <th className="px-4 py-3 text-center font-medium text-muted-foreground">Visible</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Posts</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-muted-foreground" />
                      <span className={`font-medium text-foreground ${cat.hidden ? "text-muted-foreground line-through" : ""}`}>
                        {cat.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <ToggleVisibility id={cat.id} hidden={cat.hidden} />
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{cat._count.posts}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <CategoryDialog edit={{ id: cat.id, title: cat.title, slug: cat.slug }} />
                      <DeleteButton resource="categories" id={cat.id} />
                    </div>
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
