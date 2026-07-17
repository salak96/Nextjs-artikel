import * as z from 'zod';

export const bookmarkSchema = z.object({
    id: z.string(),
});

export const bookmarkCreateSchema = z.object({
  postId: z.string(),
});