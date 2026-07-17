import { getSession } from "./auth";
import { prisma } from "./prisma";

export async function getAdminUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, email: true, name: true, profile: true },
  });
  if (!user) return null;

  const author = await prisma.author.findUnique({ where: { email: user.email } });

  return {
    ...user,
    authorId: author?.id || null,
    authorName: author?.name || user.name || "User",
    authorImage: author?.image || null,
  };
}

export type AdminUser = Awaited<ReturnType<typeof getAdminUser>>;
