import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        category: true,
        author: true,
        comments: {
          include: {
            post: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        bookmarks: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Fetch related posts
    const relatedPosts = await prisma.post.findMany({
      where: {
        categoryId: post.categoryId,
        id: { not: post.id },
      },
      include: {
        category: true,
      },
      take: 5,
    });

    return NextResponse.json({
      post: {
        ...post,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}