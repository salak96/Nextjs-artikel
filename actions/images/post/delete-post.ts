"use server";

import { postDeleteSchema } from "@/lib/validation/post";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function DeletePost(context: z.infer<typeof postDeleteSchema>) {
  try {
    const session = await getSession();
    if (!session) return false;

    const post = postDeleteSchema.parse(context);

    const data = await prisma.draft.deleteMany({
      where: {
        id: post.id,
        authorId: session.userId,
      },
    });

    return data.count > 0;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    console.log(error);
    return false;
  }
}