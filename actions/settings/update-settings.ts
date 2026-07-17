"use server";

import { profileSchema } from "@/lib/validation/profile";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import * as z from "zod";

export async function UpdateSettings(context: z.infer<typeof profileSchema>) {
  try {
    const profile = profileSchema.parse(context);
    const data = await prisma.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        fullName: `${profile.fistName} ${profile.lastName}`,
        username: profile.userName,
        avatarUrl: profile.avatarUrl,
        website: profile.website,
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
