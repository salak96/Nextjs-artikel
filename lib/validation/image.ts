import * as z from "zod";

export const imageDeleteSchema = z.object({
  postId: z.string(),
  fileName: z.string(),
});
