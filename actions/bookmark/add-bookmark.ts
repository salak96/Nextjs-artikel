"use server";

import { bookmarkCreateSchema } from "@/lib/validation/bookmark";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function AddBookmark(context: z.infer<typeof bookmarkCreateSchema>) {
  try {
    const session = await getSession();
    if (!session) {
      return false;
    }

    const bookmark = bookmarkCreateSchema.parse(context);
    
    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: session.userId,
          postId: bookmark.postId,
        },
      },
    });

    if (existing) {
      return false;
    }

    const data = await prisma.bookmark.create({
      data: {
        userId: session.userId,
        postId: bookmark.postId,
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