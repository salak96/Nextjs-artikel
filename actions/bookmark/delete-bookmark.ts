"use server";

import { bookmarkSchema } from "@/lib/validation/bookmark";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import * as z from "zod";

export async function DeleteBookmark(context: z.infer<typeof bookmarkSchema>) {
  try {
    const session = await getSession();
    if (!session) {
      return false;
    }

    const bookmark = bookmarkSchema.parse(context);

    const data = await prisma.bookmark.deleteMany({
      where: {
        id: bookmark.id,
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