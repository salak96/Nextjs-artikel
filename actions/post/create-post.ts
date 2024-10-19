"use server";

import { postCreateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase"; // Pastikan ini adalah tipe dari skema Supabase
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers"; // Untuk mengambil cookie dari request
import * as z from "zod";

export async function CreatePost(context: z.infer<typeof postCreateSchema>) {
  const cookieStore = cookies();

  // Pastikan createClient disiapkan dengan cookieStore
  const supabase = createClient({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,  // URL dari environment variable
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,  // API key dari environment variable
    cookies: cookieStore // Gunakan cookieStore untuk autentikasi
  });

  try {
    // Validasi data input menggunakan Zod
    const post = postCreateSchema.parse(context);

    // Insert ke tabel 'drafts'
    const { data, error } = await supabase
      .from("drafts")
      .insert({
        title: post.title,
        author_id: post.user_id,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return null;
    }
    
    return data;
    
  } catch (error) {
    // Tangani semua error
    console.error("CreatePost Error:", error);
    return null;
  }
}
