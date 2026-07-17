import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/dashboard/delete-button";

export default async function CommentsPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Comments</h1>
        <p className="text-sm text-muted-foreground">Manage reader comments</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Author</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Comment</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comments.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No comments yet.
                </td>
              </tr>
            ) : (
              comments.map((comment) => (
                <tr key={comment.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {comment.username?.charAt(0) || "?"}
                      </div>
                      <span className="font-medium text-foreground">{comment.username}</span>
                    </div>
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">{comment.comment}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton resource="comments" id={comment.id} />
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
