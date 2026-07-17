import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 } from "uuid";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${v4()}.${ext}`;
    const dir = join(process.cwd(), "public", "uploads", "covers");
    await mkdir(dir, { recursive: true });

    const bytes = await file.arrayBuffer();
    await writeFile(join(dir, fileName), Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/covers/${fileName}` });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
