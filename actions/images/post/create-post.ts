"use server";

import { postCreateSchema } from "@/lib/validation/post";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function CreatePost(context: z.infer<typeof postCreateSchema>) {
  try {
    const session = await getSession();
    if (!session) return null;

    const post = postCreateSchema.parse(context);

    const data = await prisma.draft.create({
      data: {
        title: post.title,
        authorId: session.userId,
      },
    });

    return data;
    
  } catch (error) {
    console.error("CreatePost Error:", error);
    return null;
  }
}