"use server";

import { imageDeleteSchema } from "@/lib/validation/image";
import { getSession } from "@/lib/auth";
import * as z from "zod";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DeleteGalleryImage(
  context: z.infer<typeof imageDeleteSchema>,
) {
  try {
    const session = await getSession();
    if (!session) return false;

    const { postId, fileName } = imageDeleteSchema.parse(context);
    
    const filePath = join(process.cwd(), "public", "uploads", session.userId, postId, fileName);
    
    try {
      await unlink(filePath);
      return true;
    } catch (error) {
      console.log("File not found or error deleting:", error);
      return false;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return false;
    }
    return false;
  }
}