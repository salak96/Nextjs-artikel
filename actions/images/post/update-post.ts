"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as z from "zod";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  try {
    const post = postUpdateSchema.parse(context);

    const data = await prisma.draft.update({
      where: {
        id: post.id,
      },
      data: {
        title: post.title,
        slug: post.slug,
        categoryId: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
