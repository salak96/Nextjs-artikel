import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { title, slug } = await req.json();
    if (!title || !slug) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const cat = await prisma.category.create({ data: { title, slug } });
    return NextResponse.json(cat);
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, title, slug } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const cat = await prisma.category.update({
      where: { id },
      data: { ...(title && { title }), ...(slug && { slug }) },
    });
    return NextResponse.json(cat);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
