import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, email, title, image } = await req.json();
    if (!name || !email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const author = await prisma.author.create({ data: { name, email, title, image } });
    return NextResponse.json(author);
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id, name, email, title, image } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const author = await prisma.author.update({
      where: { id },
      data: { ...(name && { name }), ...(email && { email }), ...(title !== undefined && { title }), ...(image !== undefined && { image }) },
    });
    return NextResponse.json(author);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
