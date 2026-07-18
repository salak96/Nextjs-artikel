import { prisma } from "@/lib/prisma";
import { getAdminUser } from "@/lib/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    let authorId = admin.authorId;
    if (!authorId) {
      const existing = await prisma.author.findUnique({ where: { email: admin.email } });
      authorId = existing
        ? existing.id
        : (await prisma.author.create({
            data: { name: admin.name || admin.email, email: admin.email },
          })).id;
    }

    const { title, slug, description, content, categoryId, image } = await req.json();
    if (!title || !slug || !categoryId) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const existing = await prisma.post.findUnique({ where: { slug } });
    if (existing) return NextResponse.json({ error: "Slug already exists, please change it" }, { status: 409 });

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        description: description || "",
        content: content || "",
        categoryId,
        authorId,
        image: image || null,
      },
    });

    await prisma.notification.create({
      data: {
        message: `Post "${title}" has been created`,
        type: "post",
        link: `/read/${slug}`,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Create failed";
    console.error("POST post error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, title, slug, description, content, categoryId, image } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(slug && { slug }),
        ...(description !== undefined && { description }),
        ...(content !== undefined && { content }),
        ...(categoryId && { categoryId }),
        ...(image !== undefined && { image }),
      },
    });
    return NextResponse.json(post);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    console.error("PUT post error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
