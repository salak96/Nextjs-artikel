import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/dashboard/delete-button";

export default async function BookmarksPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const bookmarks = await prisma.bookmark.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } }, post: { select: { title: true, slug: true } } },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bookmarks</h1>
        <p className="text-sm text-muted-foreground">All saved bookmarks</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Post</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bookmarks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No bookmarks yet.
                </td>
              </tr>
            ) : (
              bookmarks.map((bm) => (
                <tr key={bm.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {bm.user?.name || bm.user?.email || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{bm.post?.title || "-"}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {new Date(bm.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton resource="bookmarks" id={bm.id} />
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
