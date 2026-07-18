"use server";

import { commentSchema } from "@/lib/validation/comment";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function PostComment(context: z.infer<typeof commentSchema>) {
  try {
    const session = await getSession();
    if (!session) return false;

    const comment = commentSchema.parse(context);
    
    const profile = await prisma.profile.findUnique({
      where: { id: session.userId },
    });

    const data = await prisma.comment.create({
      data: {
        postId: comment.postId,
        userId: session.userId,
        username: profile?.username || session.name || "Anonymous",
        image: profile?.avatarUrl || null,
        comment: comment.comment,
      },
    });

    const post = await prisma.post.findUnique({ where: { id: comment.postId }, select: { title: true, slug: true } });

    await prisma.notification.create({
      data: {
        message: `New comment on "${post?.title || "a post"}"`,
        type: "comment",
        link: post ? `/read/${post.slug}` : null,
      },
    });

    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    console.log(error);
    return false;
  }
}