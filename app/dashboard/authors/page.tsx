import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { Users } from "lucide-react";

export default async function AuthorsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const authors = await prisma.author.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Authors</h1>
        <p className="text-sm text-muted-foreground">Manage article authors</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Posts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {authors.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No authors found.
                </td>
              </tr>
            ) : (
              authors.map((author) => (
                <tr key={author.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {author.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{author.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{author.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{author.title || "-"}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">
                    {author._count.posts}
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
