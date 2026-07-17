import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { resource, id } = await req.json();
  if (!resource || !id) return NextResponse.json({ error: "Missing resource or id" }, { status: 400 });

  try {
    switch (resource) {
      case "categories":
        await prisma.category.delete({ where: { id } });
        break;
      case "authors":
        await prisma.author.delete({ where: { id } });
        break;
      case "comments":
        await prisma.comment.delete({ where: { id } });
        break;
      case "users":
        await prisma.user.delete({ where: { id } });
        break;
      case "bookmarks":
        await prisma.bookmark.delete({ where: { id } });
        break;
      case "posts":
        await prisma.post.delete({ where: { id } });
        break;
      default:
        return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
