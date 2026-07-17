"use server";

import { commentDeleteSchema } from "@/lib/validation/comment";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function DeleteComment(
  context: z.infer<typeof commentDeleteSchema>,
) {
  try {
    const session = await getSession();
    if (!session) return false;

    const comment = commentDeleteSchema.parse(context);

    const data = await prisma.comment.deleteMany({
      where: {
        id: comment.id,
        userId: session.userId,
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